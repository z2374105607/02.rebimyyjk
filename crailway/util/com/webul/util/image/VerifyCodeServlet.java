package com.webul.util.image;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.util.Random;
import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
public class VerifyCodeServlet extends HttpServlet {
	
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
   
    /**
     * @param req
     * @param resp
     * @throws ServletException
     * @throws java.io.IOException
     */
    protected void service(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, java.io.IOException {
    	HttpSession session = req.getSession();
    	String sRand="";
    	byte width = 115; // 图片宽度
		byte height = 35; // 图片高度
		BufferedImage bufferedimage = new BufferedImage(width, height, 1);
		Graphics g = bufferedimage.getGraphics();
		Random random = new Random();
		// 设定背景色
		g.setColor(getRandColor(200, 250));
		g.fillRect(0, 0, width, height);
		g.setFont(new Font("Times New Roman", Font.BOLD, 35));
		// 产生155条干扰线，使图象中的认证码不易被其它程序探测到。
		g.setColor(getRandColor(20, 200));
		for (int i = 0; i < 155; i++) {
			int k = random.nextInt(width);
			int l = random.nextInt(height);
			int i1 = random.nextInt(12);
			int j1 = random.nextInt(12);
			g.drawLine(k, l, k + i1, l + j1);
		}

		// 取随机产生的认证码(4位数字)
		for (int j = 0; j < 4; j++) {
			String s = String.valueOf(random.nextInt(10));
			sRand += s;
			g.setColor(new Color(20 + random.nextInt(110), 20 + random.nextInt(110), 20 + random.nextInt(110)));
			g.drawString(s, 20 * (j+1), 30);
		}
		// 图象生效
		g.dispose();
        session.setMaxInactiveInterval(30 * 60);
        session.setAttribute("verifyCode", sRand);
        resp.setHeader("Pragma", "no-cache");
        resp.setHeader("Cache-Control", "no-cache");
        resp.setDateHeader("Expires", 0);
        resp.setContentType("image/jpeg");
        ServletOutputStream sos = resp.getOutputStream();
        ImageIO.write(bufferedimage, "jpeg", sos);
        sos.close();
    }
    /**
	 * 设置随机颜色
	 * 
	 * @param i
	 *            int
	 * @param j
	 *            int
	 * @return Color
	 */
	public Color getRandColor(int i, int j) {
		Random random = new Random();
		if (i > 255) {
			i = 255;
		}
		if (j > 255) {
			j = 255;
		}
		int k = i + random.nextInt(j - i);
		int l = i + random.nextInt(j - i);
		int i1 = i + random.nextInt(j - i);
		return new Color(k, l, i1);
	}

}
