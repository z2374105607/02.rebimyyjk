package com.webul.util.http;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import org.apache.http.conn.ssl.TrustStrategy;
/**
 * 信任任何密钥的策略
 * @author lwp
 *
 */
public class AnyTrustStrategy implements TrustStrategy {

	public boolean isTrusted(X509Certificate[] arg0, String arg1)throws CertificateException {
		// TODO Auto-generated method stub
		return true;
	}
}
