package  com.webul.util.sms;

public class ClientSDKTest {
	private static ClientSDK sdk = new ClientSDK();

	private static  String username = "desheng";
	private static  String password = "13106070";
	private static  String phone = "15505406619";
	private static  String content = "你不用知道我是谁，我会一直默默的喜欢你的，直到天荒地老。我会一直关注着你【喜欢你雪丽】";

	public static void main(String[] args) throws Exception{
		String ret = sdk.sendSms(username, password, phone, content);
		System.out.println(ret);
	}
}
