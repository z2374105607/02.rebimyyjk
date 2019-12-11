package com.webul.app.common;

import java.awt.AlphaComposite;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.Rectangle;
import java.awt.geom.AffineTransform;
import java.awt.image.AffineTransformOp;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Collection;
import java.util.Iterator;

import javax.imageio.ImageIO;
import javax.imageio.ImageReadParam;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;

import org.apache.commons.io.FileUtils;
  
/**  
 * @author Eric Xu  
 *  
 */  
public final class ImageUtils {   
    /**  
     * 图片水印  
     * @param pressImg 水印图片  
     * @param targetImg 目标图片  
     * @param x 修正  默认在中 
     * @param y 修正  默认在中  
     * @param alpha 透明  
     */  
    public final static void pressImage(String pressImg, String targetImg, int x, int y, float alpha) {   
        try {   
            File img = new File(targetImg);   
            Image src = ImageIO.read(img);   
            int wideth = src.getWidth(null);   
            int height = src.getHeight(null);   
            BufferedImage image = new BufferedImage(wideth, height, BufferedImage.TYPE_INT_RGB);   
            Graphics2D g = image.createGraphics();   
            g.drawImage(src, 0, 0, wideth, height, null);   
            //水印文件   
            Image src_biao = ImageIO.read(new File(pressImg));   
            int wideth_biao = src_biao.getWidth(null);   
            int height_biao = src_biao.getHeight(null);   
            g.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_ATOP, alpha));   
            g.drawImage(src_biao, (wideth - wideth_biao) / 2, (height - height_biao) / 2, wideth_biao, height_biao, null);   
            //水印文件结束   
            g.dispose();   
            ImageIO.write((BufferedImage) image, "jpg", img);   
        } catch (Exception e) {   
            e.printStackTrace();   
        }   
    }   
  
    /**  
     * 文字水印  
     * @param pressText 水印文字  
     * @param targetImg 目标图片  
     * @param fontName 字体名称  
     * @param fontStyle 字体样式  
     * @param color 字体颜色  
     * @param fontSize 字体大小  
     * @param x 修正 
     * @param y 修正  
     * @param alpha 透明
     */  
    public static void pressText(String pressText, String targetImg, String fontName, int fontStyle, Color color, int fontSize, int x, int y, float alpha) {   
        try {   
            File img = new File(targetImg);   
            Image src = ImageIO.read(img);   
            int width = src.getWidth(null);   
            int height = src.getHeight(null);   
            BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);   
            Graphics2D g = image.createGraphics();   
            g.drawImage(src, 0, 0, width, height, null);   
            g.setColor(color);   
            g.setFont(new Font(fontName, fontStyle, fontSize));   
            g.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_ATOP, alpha));   
            g.drawString(pressText, (width - (getLength(pressText) * fontSize)) / 2 + x, (height - fontSize) / 2 + y);   
            g.dispose();   
            ImageIO.write((BufferedImage) image, "jpg", img);   
        } catch (Exception e) {   
            e.printStackTrace();   
        }   
    }   
  
    /**  
     * 缩放  
     * @param filePath 图片路径  
     * @param height 高度  
     * @param width 宽度  
     * @param bb 比例不对时是否需要补
     */  
    @SuppressWarnings("static-access")
	public static void resize(String filePath, int width, int height, boolean bb) {   
        try {   
            double ratio = 0.0; //缩放比例    
            File f = new File(filePath);   
            BufferedImage bi = ImageIO.read(f);   
            Image itemp = bi.getScaledInstance(width, height, bi.SCALE_SMOOTH);   
            //计算比例   
            if ((bi.getHeight() > height) || (bi.getWidth() > width)) {   
                if (bi.getHeight() > bi.getWidth()) {   
                    ratio = (new Integer(height)).doubleValue() / bi.getHeight();   
                } else {   
                    ratio = (new Integer(width)).doubleValue() / bi.getWidth();   
                }   
                AffineTransformOp op = new AffineTransformOp(AffineTransform.getScaleInstance(ratio, ratio), null);   
                itemp = op.filter(bi, null);   
            }   
            if (bb) {   
                BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);   
                Graphics2D g = image.createGraphics();   
                g.setColor(Color.white);   
                g.fillRect(0, 0, width, height);   
                if (width == itemp.getWidth(null))   
                    g.drawImage(itemp, 0, (height - itemp.getHeight(null)) / 2, itemp.getWidth(null), itemp.getHeight(null), Color.white, null);   
                else  
                    g.drawImage(itemp, (width - itemp.getWidth(null)) / 2, 0, itemp.getWidth(null), itemp.getHeight(null), Color.white, null);   
                g.dispose();   
                itemp = image;   
            }   
            ImageIO.write((BufferedImage) itemp, "jpg", f);   
        } catch (IOException e) {   
            e.printStackTrace();   
        }   
    }   
    public static void cutJPG(InputStream input, OutputStream out, int x,  
            int y, int width, int height) throws IOException {  
        ImageInputStream imageStream = null;  
        try {  
            Iterator<ImageReader> readers = ImageIO.getImageReadersByFormatName("jpg");  
            ImageReader reader = readers.next();  
            imageStream = ImageIO.createImageInputStream(input);  
            reader.setInput(imageStream, true);  
            ImageReadParam param = reader.getDefaultReadParam();  
              
            System.out.println(reader.getWidth(0));  
            System.out.println(reader.getHeight(0));  
            Rectangle rect = new Rectangle(x, y, width, height);  
            param.setSourceRegion(rect);  
            BufferedImage bi = reader.read(0, param);  
            ImageIO.write(bi, "jpg", out);  
        } finally {  
            imageStream.close();  
        }  
    }  
      
      
    public static void cutPNG(InputStream input, OutputStream out, int x,  
            int y, int width, int height) throws IOException {  
        ImageInputStream imageStream = null;  
        try {  
            Iterator<ImageReader> readers = ImageIO.getImageReadersByFormatName("png");  
            ImageReader reader = readers.next();  
            imageStream = ImageIO.createImageInputStream(input);  
            reader.setInput(imageStream, true);  
            ImageReadParam param = reader.getDefaultReadParam();  
              
            System.out.println(reader.getWidth(0));  
            System.out.println(reader.getHeight(0));  
              
            Rectangle rect = new Rectangle(x, y, width, height);  
            param.setSourceRegion(rect);  
            BufferedImage bi = reader.read(0, param);  
            ImageIO.write(bi, "png", out);  
        } finally {  
            imageStream.close();  
        }  
    }  
      
    public static void cutImage(InputStream input, OutputStream out, String type,int x,  
            int y, int width, int height) throws IOException {  
        ImageInputStream imageStream = null;  
        try {  
            String imageType=(null==type||"".equals(type))?"jpg":type;  
            Iterator<ImageReader> readers = ImageIO.getImageReadersByFormatName(imageType);  
            ImageReader reader = readers.next();  
            imageStream = ImageIO.createImageInputStream(input);  
            reader.setInput(imageStream, true);  
            ImageReadParam param = reader.getDefaultReadParam();  
            Rectangle rect = new Rectangle(x, y, width, height);  
            param.setSourceRegion(rect);  
            BufferedImage bi = reader.read(0, param);  
            ImageIO.write(bi, imageType, out);  
        } finally {  
            imageStream.close();  
        }  
    }  
    /**  
     * 截取一个图像的中央区域  
     * @param input 处理图片的路径  ouput 处理后图片的路径  
     * @param w 需要截图的宽度  
     * @param h 需要截图的高度  
     * @return 返回一个  
     * @throws IOException  
     */  
    public static void cutImage(String input,String ouput, int w, int h) throws IOException {   
           
        // 判断参数是否合法   
    	File image = new File(input);
        if (null == image || 0 == w || 0 == h) {   
            new Exception ("哎呀，截图出错！！！");   
        }
        File file = new File(ouput);
        if(!file.exists()){
		    file.mkdirs();
		   }
        InputStream inputStream = new FileInputStream(image);   
        // 用ImageIO读取字节流   
        BufferedImage bufferedImage = ImageIO.read(inputStream);   
        BufferedImage distin = null;   
        // 返回源图片的宽度。   
        int srcW = bufferedImage.getWidth();   
        // 返回源图片的高度。   
        int srcH = bufferedImage.getHeight();   
        int x = 0, y = 0;   
        // 使截图区域居中   
        x = srcW / 2 - w / 2;   
        y = srcH / 2 - h / 2;   
        srcW = srcW / 2 + w / 2;   
        srcH = srcH / 2 + h / 2;   
        // 生成图片   
        distin = new BufferedImage(w, h, BufferedImage.TYPE_INT_RGB);   
        Graphics g = distin.getGraphics();   
        g.drawImage(bufferedImage, 0, 0, w, h, x, y, srcW, srcH, null);   
        ImageIO.write(distin, "jpg", new File(ouput));   
    }   
    public static void main(String[] args) throws IOException {   
      //  pressImage("D:\\Chrysanthemum.jpg", "D:\\Chrysanthemum.jpg", 0, 0, 0.5f);   
     //   pressText("我是文字水印", "D:\\Chrysanthemum.jpg", "黑体", 36, Color.white, 80, 0, 0, 0.3f);   
      // resize("c:\\11.jpg", 100, 100, true);   
      // ImageUtils.cutPNG(new FileInputStream("c:\\11.jpg"),  new FileOutputStream("c:\\2.jpg"), 100,100,230,230);
       //  cutImage("c:\\22.jpg","C:\\PIC\\11.jpg", 230, 230); 
     //    resize("C:\\PIC\\11.jpg", 130, 130, true); 
    	String url="F:\\yy\\apache-tomcat-7.0.47-windows-x86\\apache-tomcat-7.0.47\\webapps\\wxzf\\images\\12357";
    	File urlfile=new File(url);
    	File[] imp1 = urlfile.listFiles();
    	if (imp1 == null) {
			return;
		}
		for (int j = 0; j < imp1.length; j++) {
			File filedwid = imp1[j];
			String[] csjpg = { "jpg", "png", "gif", "JPG", "PNG", "GIF" };
			Collection<File> impFilesimg = FileUtils.listFiles(filedwid, csjpg,
					true);
			Object[] impFilesjpg = impFilesimg.toArray();
			for (int i = 0; i < impFilesjpg.length; i++) {
				File impimg =(File) impFilesjpg[i];
				String smallPath=impimg.getPath().substring(0, impimg.getPath().lastIndexOf("."))+"_small"+impimg.getPath().substring(impimg.getPath().lastIndexOf("."),impimg.getPath().length());
				cutImage(impimg.getPath(),smallPath, 230, 230); 
				System.out.println();
			}
		}
    }   
  
    public static int getLength(String text) {   
        int length = 0;   
        for (int i = 0; i < text.length(); i++) {   
            if (new String(text.charAt(i) + "").getBytes().length > 1) {   
                length += 2;   
            } else {   
                length += 1;   
            }   
        }   
        return length / 2;   
    }   
}  
