package com.webul.util;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
public class WXUtils {
//字母Z使用了两个标签，这里有２７个值  
//i, u, v都不做声母, 跟随前面的字母  
private static char[] chartable =  
  {  
    '啊', '芭', '擦', '搭', '蛾', '发', '噶', '哈', '哈',  
    '击', '喀', '垃', '妈', '拿', '哦', '啪', '期', '然',  
    '撒', '塌', '塌', '塌', '挖', '昔', '压', '匝', '座','漯','亳'  
   };  
private static char[] alphatableb =  
 {  
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',  
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'  
  };  
private static char[] alphatables =  
 {  
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',  
    'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'  
  };  
private static int[] table = new int[27];  //初始化  
 {  
        for (int i = 0; i < 27; ++i) {  
            table[i] = gbValue(chartable[i]);  
        }  
  } 
	public static String getDictSortString(String[] array){
		List<String> list = new ArrayList<String>();
		for (int i = 0; i < array.length; i++) {
			list.add(array[i]);
		}
		Collections.sort(list);
		String[] str=list.toArray(array);
		StringBuilder returnStr = new StringBuilder();
		for (int i = 0; i < str.length; i++) {
			returnStr.append(str[i]);
		}
		return returnStr.toString();
	}
	public static void method(String file, String conent)
	  {
	    BufferedWriter out = null;
	    try {
	      out = new BufferedWriter(new OutputStreamWriter(
	        new FileOutputStream(file, true)));
	      out.write(conent);
	    } catch (Exception e) {
	      e.printStackTrace();
	      try
	      {
	        if (out != null)
	          out.close();
	      }
	      catch (IOException e1) {
	        e1.printStackTrace();
	      }
	    }
	    finally
	    {
	      try
	      {
	        if (out != null)
	          out.close();
	      }
	      catch (IOException e) {
	        e.printStackTrace();
	      }
	    }
	  }
	 public static Map sort(List list){  
         Map map=new HashMap();  
         ArrayList arraylist=new ArrayList();  
         String[] alphatableb =  
             {  
                "A", "B", "C", "D", "E", "F", "G", "H", "I",  
                "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"  
               };  
             for(String a:alphatableb){  
                 for(int i=0;i<list.size();i++){//为了排序都返回大写字母  
                     if(a.equals(String2AlphaFirst(list.get(i).toString(),"b"))){  
                         arraylist.add(list.get(i).toString());  
                     }  
                 }  
                 map.put(a,arraylist);  
                 arraylist=new ArrayList();  
         }  
         return map;  
     }
	 public static String String2AlphaFirst(String SourceStr,String type) {  
         String Result = "";  
       try {  
         Result += Char2Alpha(SourceStr.charAt(0),type);  
       } catch (Exception e) {  
         Result = "";  
       }  
    return Result;  
  }
	 public static char Char2Alpha(char ch,String type) {  
         if (ch >= 'a' && ch <= 'z')  
             return (char) (ch - 'a' + 'A');//为了按字母排序先返回大写字母  
          // return ch;  
         if (ch >= 'A' && ch <= 'Z')  
             return ch;  

            int gb = gbValue(ch);  
            if (gb < table[0])  
             return '0';  
   
         int i;  
            for (i = 0; i < 26; ++i) {  
             if (match(i, gb))  
                    break;  
         }  
      
            if (i >= 26){  
             return '0';}  
            else{  
                if("b".equals(type)){//大写  
                    return alphatableb[i];  
                }else{//小写  
                    return alphatables[i];  
                }  
            }  
     } 
	 private static boolean match(int i, int gb) {  
         if (gb < table[i])  
            return false;  
          int j = i + 1;  
    
          //字母Z使用了两个标签  
          while (j < 26 && (table[j] == table[i]))  
              ++j;  
          if (j == 26)  
              return gb <= table[j];  
         else  
              return gb < table[j];  
       }  
            
  //取出汉字的编码  
  private static int gbValue(char ch) {  
      String str = new String();  
      str += ch;  
      try {  
          byte[] bytes = str.getBytes("GBK");  
              if (bytes.length < 2)  
                  return 0;  
              return (bytes[0] << 8 & 0xff00) + (bytes[1] &  
                      0xff);  
          } catch (Exception e) {  
            return 0;  
          }  
      } 
  public static void emptyTxt(String filePath)
  {
    try
    {
      File file = new File(filePath);

      if ((file.exists()) && (!file.isDirectory())) {
        boolean success = file.delete();
        if (success) {
          file = new File(filePath);
          success = file.createNewFile();
        }
      }
    } catch (Exception e) {
      e.printStackTrace(); }  } 
  
  /**
   * 
   * @param cityNmae (字符串格式为  城市名称的拼音-城市中文名称-城市code_,城市名称的拼音-城市中文名称-城市code_,)
   * @param path (json 文件生成路径)
   */
  public static void getcityJson(String cityNmae,String path){
	  String[] alphatableb =  
      {  
         "A", "B", "C", "D", "E", "F", "G", "H", "I",  
         "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"  
        };  
		String bb=getDictSortString(cityNmae.split(","));
		String[] cc=bb.split("_");
		ArrayList listARR=new ArrayList();
		for(int i=0;i<cc.length;i++){
			listARR.add(cc[i]);
		}
		Map map=sort(listARR); 
	  String temp = "[";
      for(String a:alphatableb){  
    	  Iterator it=map.keySet().iterator();    
    	  while(it.hasNext()){    
    	       String key;   
    	       String value;    
    	       key=it.next().toString();  
    	       value=map.get(key).toString();    
    	       if(a.equals(key)){ 
    	    	   String[] arr= value.toString().split(",");
    	    	   if(arr.length>1){
    	   		temp+="{\"key\":\""+key+"\",";
    	   		String tempA="";
    	   		for(int i=0;i<arr.length;i++){
    	   			String[] aal=arr[i].split("-");
    	   			tempA+="{" +
    	   				"\"realname\":\""+aal[1]+"\","+
    	   				"\"displayname\":\""+aal[1]+"\","+
    	   				"\"code\":\""+aal[2]+"\""+
    	   					"},";
    	   		}
    	   		tempA=tempA.substring(0, tempA.length()-1);
    	   		temp+="\"list\":["+tempA+"]},";
    	   		}
    	       }  
    	  } 
  }
		temp=temp.substring(0, temp.length()-1);
		temp+="]";
		emptyTxt(path);
		method(path, format(temp));
	  
  }
  
  /**
   * 得到格式化json数据  退格用\t 换行用\r
   */
  public static String format(String jsonStr) {
    int level = 0;
    StringBuffer jsonForMatStr = new StringBuffer();
    for(int i=0;i<jsonStr.length();i++){
      char c = jsonStr.charAt(i);
      if(level>0&&'\n'==jsonForMatStr.charAt(jsonForMatStr.length()-1)){
        jsonForMatStr.append(getLevelStr(level));
      }
      switch (c) {
      case '{': 
      case '[':
        jsonForMatStr.append(c+"\n");
        level++;
        break;
      case ',': 
        jsonForMatStr.append(c+"\n");
        break;
      case '}':
      case ']':
        jsonForMatStr.append("\n");
        level--;
        jsonForMatStr.append(getLevelStr(level));
        jsonForMatStr.append(c);
        break;
      default:
        jsonForMatStr.append(c);
        break;
      }
    }
    
    return jsonForMatStr.toString();

  }
  
  private static String getLevelStr(int level){
    StringBuffer levelStr = new StringBuffer();
    for(int levelI = 0;levelI<level ; levelI++){
      levelStr.append("\t");
    }
    return levelStr.toString();
  }
  public static String HanyuToPinyin(String name){
      char[] nameChar = name.toCharArray();
      HanyuPinyinOutputFormat defaultFormat = 
                                         new HanyuPinyinOutputFormat();
      String pinyinName = "";
      defaultFormat.setCaseType(HanyuPinyinCaseType.LOWERCASE);
      defaultFormat.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
      for (int i = 0; i < nameChar.length; i++) {
          if (nameChar[i] > 128) {
              try {
                  pinyinName += PinyinHelper.toHanyuPinyinStringArray
                                         (nameChar[i], defaultFormat)[0];
              } catch (Exception e) {
                  e.printStackTrace();
              }
          } 
      }
      return pinyinName;
  }
  //读取json文件数据
  public static String readJson(String path){
      //从给定位置获取文件
      File file = new File(path);
      BufferedReader reader = null;
      //返回值,使用StringBuffer
      StringBuffer data = new StringBuffer();
      //
    //  BufferedReader br=new BufferedReader(new InputStreamReader(new FileInputStream(fileName),"UTF-8"));  
      try {
          reader = new BufferedReader(new InputStreamReader(new FileInputStream(path),"GBK")); 
        		  //new BufferedReader(new FileReader(file));
          //每次读取文件的缓存
          String temp = null;
          while((temp = reader.readLine()) != null){
              data.append(temp);
          }
      } catch (FileNotFoundException e) {
          e.printStackTrace();
      } catch (IOException e) {
          e.printStackTrace();
      }finally {
          //关闭文件流
          if (reader != null){
              try {
                  reader.close();
              } catch (IOException e) {
                  e.printStackTrace();
              }
          }
      }
      return data.toString();
  }
	public static void main(String[] args) {
		/*String ddd="jsapi_ticket=sM4AOVdWfPE4DxkXGEs8VFAvvga_0_5CGXchdRGX0xpnKRkdPzs9_NBRzz8yUZUWCASWRA1KRqEQTaYxpAOyew&noncestr=liweipengwx&timestamp=1433249282&url=http://www.loveforeverff.cn/shopping/weixin/jsapi/config.jsp";
		//System.out.println(Decript.SHA1(ddd));
		String[]  aa={"哈哈哈","没有","沈亚枫","啊啊啊","宝贝","长城"};
		String[]  bb={"b","t","h","a","v","f"};
		//System.out.println(getDictSortString(bb));
		 String str = "重庆";  
	        //String strPinYin = new Trans2PinYin().convertAll(str);  
	        String strPinYin = HanyuToPinyin(str);  
	        System.out.println(strPinYin.toUpperCase()); */
		/*JSONObject QQQ=  new JSONObject();
			QQQ.put("bs", "1");
			QQQ.put("openid", "12124123");
			System.out.println(QQQ.toJSONString());*/
		
		String fullFileName = "d:\\bao.rtf";
	 	String date= readJson(fullFileName);
	 	JSONObject dataJson=(JSONObject) JSONObject.parseObject(date);
	 	JSONArray  response1=dataJson.getJSONArray("results");
	 	for(int i=0;i<response1.size();i++){
	 		JSONObject d1=(JSONObject) JSONObject.parseObject(response1.get(i).toString());
	 		JSONObject find=(JSONObject) JSONObject.parseObject(d1.get("findWorkInfo").toString());
	 		JSONObject member=(JSONObject) JSONObject.parseObject(d1.get("memberLevel").toString());
	 		System.out.println(find.get("memberName"));
	 		System.out.println(member.get("userName"));
	 	}
		
	}
}
