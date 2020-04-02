"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.163.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'leedawnm@163.com', // generated ethereal user
      pass: '93thing51' // generated ethereal password
    }
  });

  var date=new Date()
  var currentDate=date.toLocaleDateString()

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"认证邮件" <leedawnm@163.com>', // sender address
    to: "leedawnm@163.com", // list of receivers
    subject: "[QA][周报]李黎明工作周报", // Subject line
    text: "Hello world?", // plain text body
    html: `<!doctype html>
    <html lang='en'>
    
    <head>
        <!-- Required meta tags -->
        <meta charset='utf-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'>
        <title>email</title>
        <style>
        table,td,th
        {
            border:1px solid green;
        }
        th
        {
            background-color:green;
            color:white;
        }
        </style>
    </head>
    
    <body>
        <div>
            <p>Hi all:</p>
            <br>
            <p>这是我上周（20200323-20200327）的工作周报，内容如下：</p>
            <b>一、A15 QA 工作量统计数据：</b>
            <table>
                <thead>
                    <tr>
                        <th>产品代号</th>
                        <th>策划人数</th>
                        <th>程序人数</th>
                        <th>QA 人数</th>
                        <th>测试单量</th>
                        <th>人均测试单量</th>
                        <th>bug 数量</th>
                        <th>人均 bug 数量</th>
                        <th>缺陷率</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>A15</td>
                        <td>6</td>
                        <td>10</td>
                        <td>2</td>
                        <td>17</td>
                        <td>8.5</td>
                        <td>1</td>
                        <td>0.5</td>
                        <td>0.06</td>
                    </tr>
                </tbody>
            </table>
            <br>
            <b>二、项目组情况及本周工作计划：</b>
            <ol>
                <li>测试各游戏在平台过审环境的情况</li>
                <li>学习 ODC UI 布局方案</li>
                <li>odc 系统和发烧游戏平台日常回归测试</li>
            </ol>
    
            <b>三、上周工作内容总结及完成情况：</b>
            <table>
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>系统</th>
                        <th>任务单内容</th>
                        <th>负责人员</th>
                        <th>完成日期</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>oddish</td>
                        <td>test the function oddish only displays the game in the channel.</td>
                        <td>李黎明</td>
                        <td>23-27 mar 2020</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>others</td>
                        <td>add 12 accounts under 8 years old.</td>
                        <td>李黎明</td>
                        <td>23-27 mar 2020</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>oddish</td>
                        <td>regression test the oddish games in censor env.</td>
                        <td>李黎明</td>
                        <td>23-27 mar 2020</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>oddish</td>
                        <td>test the new GUI  in censor env.</td>
                        <td>李黎明</td>
                        <td>23-27 mar 2020</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>oddish</td>
                        <td>test the game of drg in release env.</td>
                        <td>李黎明</td>
                        <td>23-27 mar 2020</td>
                    </tr>
                     <tr>
                        <td>6</td>
                        <td>others</td>
                        <td>test the page slip of jiwan.</td>
                        <td>李黎明</td>
                        <td>23-27 mar 2020</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>oddish</td>
                        <td>test the page of realname-authentication and find a bug.</td>
                        <td>李黎明</td>
                        <td>23-27 mar 2020</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>skills</td>
                        <td>study the basic tutorial of vue.</td>
                        <td>李黎明</td>
                        <td>23-27 mar 2020</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>skills</td>
                        <td>study the css style in w3chool.</td>
                        <td>李黎明</td>
                        <td>23-27 mar 2020</td>
                    </tr>
                </tbody>
            </table>
            <br>
            <p>谢谢！</p>
    
            <br>
            <br>
            <br>
    
            <p>`+currentDate+`</p>
            <p>——————————</p>
            <p><small>QA｜李黎明</small></p>
            <p><small>Email/POPO：liliming@corp.netease.com</small></p>
            <p><small>Tel: 13268314162</small></p>
        </div>
        <script src="trello_operation.js"></script>
    </body>
    
    </html>`// html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);