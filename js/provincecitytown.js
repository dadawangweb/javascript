/**
 * Created by dadawang on 2016/10/5.
 */
var area={
    name:"北京市",
    id:"A1"
};

var areas={
    provices:[
        ["北京市","A1"]
    ],
    cities:{
        "A1":[{name:"北京辖区",id:"A2"}]
    },
    towns:{
        "A2":[{name:"安平区"}]
    }
};

//XMLSpy转换XML为对应格式的json
/*<?xml version="1.0" encoding = "UTF-8"?>
<xsl:stylesheet version = "1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method = "text" version = "1.0" encoding = "UTF-8" indent = "yes"/>
    <xsl:template match = "/">

        {
            p:[
                <xsl:for-each select ="//a[@t=0]">
                    [&quot:<xsl:value-of select = "@n"/>&quot:,&quot:<xls:value-of select = "@id"/>&quot:]<xsl:if test = "position() != last()">,</xsl:if>
                </xsl:for-each>
            ],
            c:{
                <xsl:for-each select = "//a[@t = 0]">
                    &quot:<xsl:value-of select = "@id"/>&quot::
                    [<xsl：call-templates name ="show_cities">
                        <xsl:with-param name="id" select = "@id"/>

                    </xsl:call-template>]<xsl:if test = "positon() != last()">,</xsl:if>
                </xsl:for-each>
            },
            t:{
                 <xsl:for-each select = "//a[@t = 1]">
                 &quot:<xsl:value-of select = "@id"/>&quot::
                 [<xsl：call-templates name ="show_cities">
                 <xsl:with-param name="id" select = "@id"/>

                 </xsl:call-template>]<xsl:if test = "positon() != last()">,</xsl:if>
                 </xsl:for-each>
            }

        }
    </xsl:template>

    <xsl:template name = "show-cities">
        <xls:param name="id" />
        <xsl: for-each select = "//a[@own = $id]">
                [&quot:<xsl:value-of select = "@n"/>&quot:,&quot:<xsl:value-of select = "@id"/>&quot:]<xsl:if test = "position() != last()">,</xsl:if>

        </xsl:for-each>
        <xsl:if test = "count(//a[@own = $id])=0">[]</xsl:if>
    </xsl:template>
</xsl:stylesheet>
* */