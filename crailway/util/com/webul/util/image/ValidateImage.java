package com.webul.util.image;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Random;

/**
 * 
 * @FILE:ValidateImage
 * @DESC:系统验证码
 */
public class ValidateImage {
	
	private String sRand;

	public ValidateImage() throws IOException {
		sRand = "";
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

	/**
	 * 返回随机数
	 * 
	 * @return String
	 */
	public String getRand() {
		return this.sRand;
	}

	/**
	 * 图片验证码主程序
	 * 
	 * @return BufferedImage
	 */
	public BufferedImage getValidateImage() {

		byte width = 50; // 图片宽度
		byte height = 15; // 图片高度
		BufferedImage bufferedimage = new BufferedImage(width, height, 1);
		Graphics g = bufferedimage.getGraphics();
		Random random = new Random();

		// 设定背景色
		g.setColor(getRandColor(200, 250));
		g.fillRect(0, 0, width, height);
		g.setFont(new Font("Times New Roman", Font.BOLD, 14));

		// 产生155条干扰线，使图象中的认证码不易被其它程序探测到。
		g.setColor(getRandColor(160, 200));
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
			g.setColor(new Color(20 + random.nextInt(110), 20 + random
					.nextInt(110), 20 + random.nextInt(110)));
			g.drawString(s, 12 * j + 3, 13);
		}
		// 图象生效
		g.dispose();
		return bufferedimage;
	}
}
