// alert("TableContent.js is linked");

function startConv() {
    var tr = document.getElementById('openConversations').insertRow();
    var cStart = tr.insertCell(0);
    var cCity = tr.insertCell(1);
    var cTopic = tr.insertCell(2);
    var cLanguage = tr.insertCell(3);
    var cGender = tr.insertCell(4);
    var cAge = tr.insertCell(5);
    var cEnd = tr.insertCell(6);

    const date = Date.now();
    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric' })
    const [{ value: month }, , { value: day }, , { value: year }, , { value: hour }, , { value: minute }] = dateTimeFormat.formatToParts(date)

    cStart.innerHTML = "<div id='" + date + "''>" + `${day}-${month}-${year} ,${hour}:${minute}` + "</div>";
    cCity.innerHTML = "<select><option value='jerusalem'>ירושלים</option><option value='naaria'>נהריה</option><option value='haifa'>חיפה</option><option value='telAviv'>תל אביב</option><option value='ashdod'>אשדוד</option><option value='Ashkelon'>אשקלון</option><option value='beerSheva'>באר שבע</option></select>";
    cTopic.innerHTML = "<select><option value='Medical'>טיפול רפואי</option><option value='drugs'>תרופות</option><option value='food'>מזון</option><option value='water'>מים</option><option value='shelter'>מיגון</option><option value='information'>מידע</option><option value='evacuation'>פינוי</option></select>";
    cLanguage.innerHTML = "<select><option value='hebrew'>עברית</option><option value='english'>אנגלית</option><option value='amharic'>אמהרית</option><option value='russian'>רוסית</option><option value='arabic>ערבית</option><option value='thai'>תאילנדית</option></select>";
    cAge.innerHTML = "<input type='number' min='0' max='120'/>";
    cGender.innerHTML = "<select><option value='male'>גבר</option><option value='female'>אישה</option></select>";
    cEnd.innerHTML = "<button onclick='reportEndCall(this.parentNode.parentNode)'>סיום</button>";

    var totalCalls = parseInt(document.getElementById("total").value) || 0;
    document.getElementById("total").value = (++totalCalls) + "";
    
    

}

function reportEndCall(row) {
    var totalCalls = parseInt(document.getElementById("total").value) || 0;
    if (parseInt(totalCalls) > 0) {
        document.getElementById("total").value = (--totalCalls) + "";
    }

    var message = {};
    message.id = row.cells[0].getElementsByTagName('div')[0].id;
    message.city = row.cells[1].getElementsByTagName('select')[0].value;
    message.topic = row.cells[2].getElementsByTagName('select')[0].value;
    message.language = row.cells[3].getElementsByTagName('select')[0].value;
    message.gender = row.cells[4].getElementsByTagName('select')[0].value;
    message.age = (row.cells[5].getElementsByTagName('input')[0].value || 18);
    message.totalTime = (parseInt(Date.now()) - parseInt(message.id)) / 1000; // seconds
   // message.currTime = Math.floor(ParseInt(Date.now())/1000);//save timestamp by seconds
    
    socket.emit("callDetails", message);
    deleteRow(row);
}

function deleteRow(row) {
    var i = row.rowIndex;
    document.getElementById('openConversations').deleteRow(i);
}