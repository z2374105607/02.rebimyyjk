package com.webul.util;
import java.awt.AlphaComposite;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.Transparency;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Collection;

import javax.imageio.ImageIO;

import org.apache.commons.io.FileUtils;

import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;


public class ImageTools {
	 /**
     * 创建图片缩略图(等比缩放)
     * 
     * @param src
     *            源图片文件完整路径
     * @param dist
     *            目标图片文件完整路径
     * @param width
     *            缩放的宽度
     * @param height
     *            缩放的高度
     */
    public static void createThumbnail(String src, String dist, float width,
            float height) {
        try {
            File srcfile = new File(src);
            if (!srcfile.exists()) {
                System.out.println("文件不存在");
                return;
            }
            BufferedImage image = ImageIO.read(srcfile);

            // 获得缩放的比例
            double ratio = 1.0;
            // 判断如果高、宽都不大于设定值，则不处理
            if (image.getHeight() > height || image.getWidth() > width) {
                if (image.getHeight() > image.getWidth()) {
                    ratio = height / image.getHeight();
                } else {
                    ratio = width / image.getWidth();
                }
            }
            // 计算新的图面宽度和高度
            int newWidth = (int) (image.getWidth() * ratio);
            int newHeight = (int) (image.getHeight() * ratio);

            BufferedImage bfImage = new BufferedImage(newWidth, newHeight,
                    BufferedImage.TYPE_INT_RGB);
            bfImage.getGraphics().drawImage(
                    image.getScaledInstance(newWidth, newHeight,
                            Image.SCALE_SMOOTH), 0, 0, null);

            FileOutputStream os = new FileOutputStream(dist);
            JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(os);
            encoder.encode(bfImage);
            os.close();
            System.out.println("创建缩略图成功");
        } catch (Exception e) {
            System.out.println("创建缩略图发生异常" + e.getMessage());
        }
    }
    /**  
     * 图片水印  
     * @param pressImg 水印图片  
     * @param targetImg 目标图片  
     * @param x 修正  默认在中 
     * @param y 修正  默认在中  
     * @param alpha 透明  
     */  
    public final static void pressImage(String pressImg, String targetImg, float alpha) {   
        try {   
            File img = new File(targetImg);   
            File img2 = new File(pressImg);   
            Image src = ImageIO.read(img);   
            BufferedImage image1 = ImageIO.read(img2);
            // 获得缩放的比例
            double ratio = 1.0;
            float width1=70;
            float height1=70;
            // 判断如果高、宽都不大于设定值，则不处理
            if (image1.getHeight() > height1 || image1.getWidth() > width1) {
                if (image1.getHeight() > image1.getWidth()) {
                    ratio = height1 / image1.getHeight();
                } else {
                    ratio = width1 / image1.getWidth();
                }
            }
            // 计算新的图面宽度和高度
            int newWidth = (int) (image1.getWidth() * ratio);
            int newHeight = (int) (image1.getHeight() * ratio);

            BufferedImage bfImage = new BufferedImage(newWidth, newHeight,
                    BufferedImage.TYPE_INT_RGB);
            bfImage.getGraphics().drawImage(image1.getScaledInstance(newWidth, newHeight,Image.SCALE_SMOOTH), 0, 0, null);
            
            
            
        //    Graphics2D g2d = bfImage.createGraphics();  
        //    bfImage = g2d.getDeviceConfiguration().createCompatibleImage(newWidth,newHeight,Transparency.TRANSLUCENT);  
        //    g2d.dispose(); 
       //     g2d = bfImage.createGraphics(); 
            
            int wideth = src.getWidth(null);   
            int height = src.getHeight(null);   
            BufferedImage image = new BufferedImage(wideth, height, BufferedImage.TYPE_INT_RGB);   
            Graphics2D g = image.createGraphics();   
            g.drawImage(src, 0, 0, wideth, height, null);   
            //水印文件   
         //   Image src_biao = ImageIO.read(new File(pressImg));   
            int wideth_biao = bfImage.getWidth(null);   
            int height_biao = bfImage.getHeight(null);   
            g.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_ATOP, alpha));   
            g.drawImage(bfImage, (wideth - wideth_biao) / 2, (height - height_biao) / 2, wideth_biao, height_biao, null);   
            //水印文件结束   
            g.dispose();   
            ImageIO.write((BufferedImage) image, "jpg", img);   
        } catch (Exception e) {   
            e.printStackTrace();   
        }   
    }   
   /* public static void main(String[] args) {
        createThumbnail("E:\\imagetest\\IMG_20150322_135655.jpg", "E:\\imagetest\\a.png", 100, 100);
        createThumbnail("E:\\imagetest\\IMG_20150322_135655.jpg", "E:\\imagetest\\b.png", 2000, 2000);
        createThumbnail("E:\\imagetest\\IMG_20150322_135655.jpg", "E:\\imagetest\\c.jpg", 800, 600);
    }*/
    public static void main(String[] args) throws IOException {   
        //  pressImage("D:\\Chrysanthemum.jpg", "D:\\Chrysanthemum.jpg", 0, 0, 0.5f);   
       //   pressText("我是文字水印", "D:\\Chrysanthemum.jpg", "黑体", 36, Color.white, 80, 0, 0, 0.3f);   
        // resize("c:\\11.jpg", 100, 100, true);   
        // ImageUtils.cutPNG(new FileInputStream("c:\\11.jpg"),  new FileOutputStream("c:\\2.jpg"), 100,100,230,230);
         //  cutImage("c:\\22.jpg","C:\\PIC\\11.jpg", 230, 230); 
       //    resize("C:\\PIC\\11.jpg", 130, 130, true); 
      	String url="D:\\img";
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
  				if(impimg.getPath().indexOf("small")>-1){
  					impimg.delete();
  				}
  				//String smallPath=impimg.getPath().substring(0, impimg.getPath().lastIndexOf("."))+"_small"+impimg.getPath().substring(impimg.getPath().lastIndexOf("."),impimg.getPath().length());
  				//createThumbnail(impimg.getPath(),smallPath, 230, 230); 
  				//System.out.println();
  			}
  		}
      } 
}
