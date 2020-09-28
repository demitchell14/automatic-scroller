<!--#include file="config.asp"-->
<%
dim req
dim x
dim theCount, theScreen
dim noScreens, screenNo
dim theLimit, theOffset

'GOLIVE'
screenNo = CInt(request.querystring("screen"))

req = "SELECT count(*) as theCount FROM " & File1
req = req & " where DktDate = ""2020-09-25"";"
rs.Open req,conn
theCount = rs.Fields("theCount")
if CInt(theCount) >= CInt(range4) then
                noScreens = 4
else
                if CInt(theCount) >= CInt(range2) then
                                noScreens = 2
                else
                                noScreens = 1
                end if
end if
if screenNo > noScreens then
                screenNo = screenNo - noScreens
end if
theLimit = int((CInt(theCount) / noScreens) + .5)
theOffset = theLimit * (ScreenNo -1)
if noScreens = 1 then
                theOffset = 0
End If

' test to be sure we don't gap or not go to EOF.
rs.close
req = "SELECT * FROM " & File1
req = req & " where DktDate = ""2020-09-25"" "
req = req & "order by dktNameL, dktNameF, dktNamem, dktID "
req = req & "limit " & theLimit
req = req & " offset " & theOffset

req = req & ";"
'response.write req
rs.Open req,conn
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tarrant County Docket</title>
    <link href="css/main.1c7f5b4ecc480620a10f.css" rel="stylesheet">
</head>
<body>
    <div id="header" class="header">
        <div class="header-main">
            <img src="images/tarrant.png" alt="Tarrant County" width="100" align="left">
            <div align="right">
                <h1 align="center">
                Tornado alert! Take cover immediately
                </h1>
            </div>
        </div>
        <div class="announcement"></div>
    </div>
    <table id="list">
<!--        <tr data-repeatable data-count="80"> -->
<%data_id=0%>
<%do until rs.EOF%>
        <tr data-id="<%=data_id%>">
            <td><%= rs.Fields("DktNameL") %>,&nbsp<%= rs.Fields("DktNameF") %></td>
            <td><%= rs.Fields("DktCaseNo") %></td>
            <td><%= rs.Fields("DktLoc") %></td>
            <td><%= rs.Fields("DktFloor") %></td>
        </tr>
<%
if (data_id = 0) then
                name_from = rs.Fields("DktNameL") & " " & rs.Fields("DktNameF")
End If
name_to = rs.Fields("DktNameL")  & " " & rs.Fields("DktNameF")
data_id = data_id + 1
rs.MoveNext
loop

rs.close
set rs=nothing
conn.close
set conn=nothing
%>
    </table>
    <div id="footer" class="footer">
        <span class="screen-id"><%=theCount%>&nbsp;+&nbsp;<%=theLimit%>&nbsp;+&nbsp;<%=theOffset%>&nbsp;+&nbsp;<%=noScreens%></span>
        <span class="range">From:&nbsp;<%=name_from%>&nbsp;&nbsp;To:&nbsp;<%=name_To%></span>
    </div>
<script src="js/main-d7a03a53678b228e882e.js"></script></body>
<script>

    // below is an example with only 5 parameters exposed. everything else is handled in function.
    // this mean it does in fact require a header, footer, and items that have data-id attributes
    if (autoScrollerMin) {
        autoScrollerMin({
            fps: 60,
            delay: 5000,
            scrollBy: 5,
            onEnd() {
                window.scrollTo(0, 0);
                location.reload();
            }
        })
    }

    // below is example of autoScroll with all parameters exposed. you set your header height and container height
    // as well as item heights
    // -----------------------
    // var header = document.getElementById('header');
    // var footer = document.getElementById('footer');
    // var table = document.getElementById('list');
    // var items = document.getElementsByTagName('tr');
    //
    // var itemHeight, containerHeight = window.innerHeight;
    // if (header) {
    //     containerHeight -= header.clientHeight;
    //     table.style.paddingTop = header.clientHeight + "px"
    // }
    // if (footer) {
    //     containerHeight -= footer.clientHeight;
    //     table.style.paddingBottom = footer.clientHeight + "px"
    // }
    // if (items && items.length > 0) {
    //     var item = items.item(0);
    //     itemHeight = item.clientHeight;
    // }
    //
    // if (autoScroller) {
    //     // autoScroller({
    //     //     containerHeight,
    //     //     fps: 60,
    //     //     delay: 5000,
    //     //     scrollBy: 5,
    //     //     itemHeight: itemHeight ? itemHeight : 0,
    //     //     marginTop: header.clientHeight,
    //     //     lastItemId: Number.parseInt(items[items.length - 1].getAttribute('data-id')),
    //     //     onEnd() {
    //     //         window.scrollTo(0, 0);
    //     //         location.reload();
    //     //     }
    //     // });
    // }
    // console.log(autoScroller);
</script>
</html>
