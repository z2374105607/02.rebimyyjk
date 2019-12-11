<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
	    <xsl:apply-templates select="services"/> 
		<xsl:apply-templates select="services/catalog"/>  
	</xsl:template>
	<xsl:template match="//catalog" name="directory">
	<!-- 
	   <xsl:if test=".//service">
	 -->
	  	<ul>
			<li treeType="catalog">
				<span>
					<xsl:value-of select="@nodealias" />
				</span>
				<xsl:apply-templates select="./catalog"/> 
				<xsl:apply-templates select="./service"/> 
			</li>
			  <xsl:apply-templates select="/service"/> 
		</ul>
		<!-- 
		  </xsl:if>
		 -->
	</xsl:template>
	<xsl:template match="//service" name="item">
	<ul>
	   <!-- 过滤wmts 底图 rest 底图 wms 底图 undefined 未知类型 -->
	    <li>
		   <xsl:attribute name="id">
		      <xsl:value-of select="concat(string(@pkid),'-',string(@servicecapability))" />
		    </xsl:attribute>
			<xsl:value-of select="@servicealias" />
		</li>
	</ul>
	</xsl:template>
	<xsl:template match="//services" name="services">
		<div id="services" style="height:24px;border-bottom:1px dashed #999;">
		   <span>服务总数：</span>(
		   <span style="color:red">
		      <xsl:value-of select="count(//service)" />
		   </span>)
		   <span style="color:#aaa">(所有目录下服务数和)</span>
		</div>
	</xsl:template>
	<xsl:template match="*" name="attr">
	     <xsl:if test="@class!=''">
		    <xsl:attribute name="class">
		      <xsl:value-of select="@class" />
		    </xsl:attribute>
		 </xsl:if>
		 <xsl:if test="@data-options!=''">
		    <xsl:attribute name="data-options">
		      <xsl:value-of select="@data-options" />
		    </xsl:attribute>
		   </xsl:if>
		   <xsl:if test="@click!=''">
		     <xsl:attribute name="onclick">
		       <xsl:value-of select="@click" />
		     </xsl:attribute>
		   </xsl:if>
	</xsl:template>
</xsl:stylesheet>