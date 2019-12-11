package qrcode;  
  
import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import com.swetake.util.Qrcode;
import com.webul.util.ImageTools;
public class GucasQRCodeEncoder {  
      
    public static int max_data_size_small = 84;  
    public static int max_data_size_large = 500;  
      
    /** 
     *  
     * @param srcValue 
     * @param qrcodePicfilePath 
     * @return 
     */  
    public static boolean encode(String srcValue, String qrcodePicfilePath) {  
        return  encode_500(srcValue, qrcodePicfilePath);  
      //  return  encode_84(srcValue, qrcodePicfilePath);  
    }  
      
    /** 
     * Encoding the information to a QRCode, size of the information must be less than 84 byte. 
     * @param srcValue 
     * @param qrcodePicfilePath 
     * @return 
     */  
    public static boolean encode_84(String srcValue, String qrcodePicfilePath) {  
        int MAX_DATA_LENGTH = max_data_size_small; // �������ɶ�ά�����������С  
        byte[] d = srcValue.getBytes();  
        int dataLength = d.length;  
        int imageWidth = 113; /* 113��Ԥ�ȼ��������. ע�⣺ͼ���ȱ�������ɵĶ�ά��ͼ���ȴ�,�������,����,��ά��ʶ�𲻳��� */  
        int imageHeight = imageWidth;  
        BufferedImage bi = new BufferedImage(imageWidth, imageHeight,  
                BufferedImage.TYPE_INT_RGB);  
        Graphics2D g = bi.createGraphics();  
        g.setBackground(Color.WHITE);  
        g.clearRect(0, 0, imageWidth, imageHeight);  
        g.setColor(Color.BLACK);  
        if (dataLength > 0 && dataLength <= MAX_DATA_LENGTH) {  
            /* ���ɶ�ά�� */  
            Qrcode qrcode = new Qrcode();  
            qrcode.setQrcodeErrorCorrect('M'); // L, Q, H, Ĭ��  
            qrcode.setQrcodeEncodeMode('B'); // A, N, Ĭ��  
            qrcode.setQrcodeVersion(5); // 37�ֽ�, (37-1)*3+2+3-1+1 = 113  
            boolean[][] b = qrcode.calQrcode(d);  
            int qrcodeDataLen = b.length;  
            for (int i = 0; i < qrcodeDataLen; i++) {  
                for (int j = 0; j < qrcodeDataLen; j++) {  
                    if (b[j][i]) {  
                        g.fillRect(j * 3 + 2, i * 3 + 2, 3, 3); /* 
                                                                 * ����ά��ͼ��, 
                                                                 * ������ͼ�ο���� 
                                                                 * ((qrcodeDataLen-1)*3+2) + 
                                                                 * 3 -1 ; 
                                                                 * ���ɵ�image�Ŀ�ȴ�С����>=��ֵ,��Χ��1������������ʶ�˿�����Ϊ��ά�� 
                                                                 */  
                        /* 
                         * fillRect(int x, int y, int width, int height) �������ã� 
                         * ���ָ���ľ��Ρ��þ�����ߺ��ұ�λ�� x �� x + width - 1�����ߺ͵ױ�λ�� y �� y + 
                         * height - 1�� �õ��ľ��θ��ǵ�������Ϊ width ���أ��߶�Ϊ height ���ء� 
                         * ʹ��ͼ�������ĵĵ�ǰ��ɫ���þ��Ρ� ������ x - Ҫ�����ε� x ���ꡣ y - Ҫ�����ε� y 
                         * ���ꡣ width - Ҫ�����εĿ�ȡ� height - Ҫ�����εĸ߶ȡ� 
                         *  
                         * �ο���http://bk.chinaar.com/index.php?doc-view-2999 
                         */  
                    }  
                }  
            }  
            System.out.println("��ά�����ݳ���(�ֽ�):" + qrcodeDataLen);  
        } else {  
            System.out.println("Generate QRCode image error! Data size is " + dataLength +", it is lager than 84 bytes.");  
            return false;  
        }  
        g.dispose();  
        bi.flush();  
        /* generate image */  
        File f = new File(qrcodePicfilePath);  
        String suffix = f.getName().substring(f.getName().indexOf(".")+1, f.getName().length());  
        try {  
            ImageIO.write(bi, suffix, f); //"png"  
        } catch (IOException ioe) {  
            System.out.println("Generate QRCode image error!" + ioe.getMessage());  
            return false;  
        }  
  
        return true;  
    }  
      
    /** 
     * Encoding the information to a QRCode, size of the information must be less tah 500 byte. 
     * @param srcValue 
     * @param qrcodePicfilePath 
     * @return 
     */  
    public static boolean encode_500(String srcValue, String qrcodePicfilePath) {  
        int MAX_DATA_LENGTH = max_data_size_large; // �������ɶ�ά�����������С. 500�ֽڵ�ԭʼ����, ���ɶ�ά��ʱ, ��89���  
        byte[] d = srcValue.getBytes();  
        int dataLength = d.length;  
        int imageWidth = 269; /* 269��Ԥ�ȼ��������. ע�⣺ͼ���ȱ�������ɵĶ�ά��ͼ���ȴ�,�������,����,��ά��ʶ�𲻳��� */  
        int imageHeight = imageWidth;  
        BufferedImage bi = new BufferedImage(imageWidth, imageHeight,  
                BufferedImage.TYPE_INT_RGB);  
        Graphics2D g = bi.createGraphics();  
        g.setBackground(Color.WHITE);  
        g.clearRect(0, 0, imageWidth, imageHeight);  
        g.setColor(Color.BLACK);  
        if (dataLength > 0 && dataLength <= MAX_DATA_LENGTH) {  
            /* ���ɶ�ά�� */  
            Qrcode qrcode = new Qrcode();  
            qrcode.setQrcodeErrorCorrect('M'); // L, Q, H, Ĭ��  
            qrcode.setQrcodeEncodeMode('B'); // A, N, Ĭ��  
            qrcode.setQrcodeVersion(18); // 0<= version <=40; 89�ֽ�,  
                                            // (89-1)*3+2+3-1+1 = 269  
            boolean[][] b = qrcode.calQrcode(d);  
            int qrcodeDataLen = b.length;  
            for (int i = 0; i < qrcodeDataLen; i++) {  
                for (int j = 0; j < qrcodeDataLen; j++) {  
                    if (b[j][i]) {  
                        g.fillRect(j * 3 + 2, i * 3 + 2, 3, 3); /* 
                                                                 * ����ά��ͼ��, 
                                                                 * ������ͼ�ο���� 
                                                                 * ((qrcodeDataLen-1)*3+2) + 
                                                                 * 3 -1 = 136; 
                                                                 * ���ɵ�image�Ŀ�ȴ�С����>=(136+1),��Χ��1������������ʶ�˿�����Ϊ��ά�� 
                                                                 */  
                        /* 
                         * fillRect(int x, int y, int width, int height) �������ã� 
                         * ���ָ���ľ��Ρ��þ�����ߺ��ұ�λ�� x �� x + width - 1�����ߺ͵ױ�λ�� y �� y + 
                         * height - 1�� �õ��ľ��θ��ǵ�������Ϊ width ���أ��߶�Ϊ height ���ء� 
                         * ʹ��ͼ�������ĵĵ�ǰ��ɫ���þ��Ρ� ������ x - Ҫ�����ε� x ���ꡣ y - Ҫ�����ε� y 
                         * ���ꡣ width - Ҫ�����εĿ�ȡ� height - Ҫ�����εĸ߶ȡ� 
                         *  
                         * �ο���http://bk.chinaar.com/index.php?doc-view-2999 
                         */  
                    }  
                }  
            }  
            System.out.println("��ά�����ݳ���(�ֽ�):" + qrcodeDataLen);  
        } else {  
            return false;  
        }  
        g.dispose();  
        bi.flush();  
        /* generate image */  
        File f = new File(qrcodePicfilePath);  
        String suffix = f.getName().substring(f.getName().indexOf(".")+1, f.getName().length());  
        System.out.println(suffix);  
        try {  
            ImageIO.write(bi, suffix, f); //"png"  
        } catch (IOException ioe) {  
            System.out.println("Generate QRCode image error!" + ioe.getMessage());  
            return false;  
        }  
  
        return true;  
    }  
      
    public static void main(String[] args) throws Exception {  
          
        String data = "���Ƿ�";  
        System.out.println("�ֽ���: " + data.getBytes().length);  
        GucasQRCodeEncoder.encode(data, "D:\\33A.JPG");  
        ImageTools.pressImage("D:\\logo.png","D:\\33A.JPG", (float) 1);
      //  System.out.println(GucasQRCodeDecoder.decode("A.JPG"));  
    }  
} 