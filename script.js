let currentYear = 2026;

const months = [
"January","February","March","April","May","June",
"July","August","September","October","November","December"
];

let events = JSON.parse(localStorage.getItem("myGirlyEvents")) || {};

function renderCalendar(year) {

    const container = document.getElementById("calendarContainer");
    const yearTitle = document.getElementById("yearTitle");

    yearTitle.innerText = year + " Calendar";
    container.innerHTML = "";

    months.forEach((mName, mIdx) => {

        let html = `<div class="month">
        <h3>${mName}</h3>
        <table>
        <tr>`;

        ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(day => {
            html += `<th>${day}</th>`;
        });

        html += `</tr><tr>`;

        let firstDay = new Date(year, mIdx, 1).getDay();
        let daysInMonth = new Date(year, mIdx + 1, 0).getDate();
        let today = new Date();

        for (let i = 0; i < firstDay; i++) {
            html += `<td></td>`;
        }

        for (let d = 1; d <= daysInMonth; d++) {

            if ((d + firstDay - 1) % 7 === 0 && d !== 1) {
                html += `</tr><tr>`;
            }

            let dateKey = `${mName} ${d}, ${year}`;

            let isToday =
                (today.getFullYear() === year &&
                today.getMonth() === mIdx &&
                today.getDate() === d)
                ? "today"
                : "";

            let hasEvent = events[dateKey] ? "has-event" : "";

            html += `<td class="${isToday} ${hasEvent}" onclick="openModal('${dateKey}')">${d}</td>`;
        }

        html += `</tr></table></div>`;

        container.innerHTML += html;
    });
}

let activeDate = "";

function openModal(dateStr) {
    activeDate = dateStr;

    document.getElementById("selectedDateText").innerText = dateStr;
    document.getElementById("eventInput").value = events[dateStr] || "";
    document.getElementById("eventModal").style.display = "block";
}

function closeModal() {
    document.getElementById("eventModal").style.display = "none";
}

function saveEvent() {

    let val = document.getElementById("eventInput").value;

    if (val.trim()) {
        events[activeDate] = val;
    } else {
        delete events[activeDate];
    }

    localStorage.setItem("myGirlyEvents", JSON.stringify(events));

    renderCalendar(currentYear);
    closeModal();
}

function deleteEvent() {

    delete events[activeDate];

    localStorage.setItem("myGirlyEvents", JSON.stringify(events));

    renderCalendar(currentYear);
    closeModal();
}

function changeYear(n) {
    currentYear += n;
    renderCalendar(currentYear);
}

function resetTo2026() {
    currentYear = 2026;
    renderCalendar(currentYear);
}

renderCalendar(currentYear);

window.onclick = function(e) {
    if (e.target === document.getElementById("eventModal")) {
        closeModal();
    }
};