let now = new Date()
main(now)

function main(currentMoth) {
    // 获取年月
    const year = currentMoth.getFullYear()
    const month = currentMoth.getMonth() + 1
    initTime()
    randersCalender()
    now = currentMoth

    function initTime() {
        const time = document.querySelector('#time')
        time.textContent = `${year}年${month}月`
    }

    function randersCalender() {
        // 获取日期
        // 获取当月第一天
        const firstDayOfCurrentMonth = new Date(year, month - 1, 1)
        // 下个月第一天
        const firstDayOfNextMonth = new Date(year, month, 1)

        const days = document.querySelector('#days')
        // 清空列表
        days.innerHTML = ''
        // 渲染日历
        // 获取当月第一天是星期几
        const weekdayOfFirstDayOfCurrentMonth = firstDayOfCurrentMonth.getDay()
        // 下月初 等于 本月末+1
        // 获取下月第一天
        // 然后new Date获取本月天数
        // 86400 * 1000为一天  
        // 设置一天
        let oneDay = 86400 * 1000

        // 本月最后一天
        const lastDayOfCurrentMonth = new Date(firstDayOfNextMonth - oneDay)
        // 获取本月多少天
        const daysOfCurrentMonth = lastDayOfCurrentMonth.getDate()
        // 下个月第一天是周几
        const weekdayOfFirstDayOfNextMonth = firstDayOfNextMonth.getDay()


        // 添加表首填充日期
        if (weekdayOfFirstDayOfCurrentMonth <= 6) {
            for (let i = 1; i <= weekdayOfFirstDayOfCurrentMonth; i++) {
                const li = document.createElement('li')
                const lastMonthDays = new Date(firstDayOfCurrentMonth - oneDay * i)
                li.textContent = lastMonthDays.getDate()
                li.classList.add('calendar-days-gray')
                days.prepend(li)
            }
        }
        let selectedLi
        const toDay = new Date()
        // 添加日期到表中
        for (let i = 1; i <= daysOfCurrentMonth; i++) {
            const li = document.createElement('li')
            li.textContent = i
            if (i === toDay.getDate() && month === toDay.getMonth() + 1 && year === toDay.getFullYear()) {
                li.classList.add('calendar-days-today')
            }
            
            li.onclick = () => {
                if (selectedLi) {
                    selectedLi.classList.remove('calender-days-selected')
                }
                li.classList.add('calender-days-selected')
                selectedLi = li
                if (events) {
                    const fragment =document.createDocumentFragment()
                    events.map(event=>{
                        const div =document.createElement('div')
                        div.textContent=event
                        fragment.append(div)
                    })
                    document.querySelector('#events').innerHTML=''
                    document.querySelector('#events').append(fragment)

                }else{
                    document.querySelector('#events').innerHTML='<div>无</div>'
                }
            }
            const key = `${year}-${month}-${i}`
            const events = window.data[key]
            if (events) {
                li.classList.add('calender-days-hasEvents')
            }
            if (events) {
                const fragment =document.createDocumentFragment()
                events.map(event=>{
                    const div =document.createElement('div')
                    div.textContent=event
                    fragment.append(div)
                })
                document.querySelector('#events').innerHTML=''
                document.querySelector('#events').append(fragment)

            }else{
                document.querySelector('#events').innerHTML='<i>选择日期以显示日程</i>'
            }
            days.append(li)
        }


        // 添加表末填充日期
        if (weekdayOfFirstDayOfCurrentMonth >= 4 && daysOfCurrentMonth > 30) {
            forOne()
        } else if (weekdayOfFirstDayOfCurrentMonth <= 4) {
            forTwo()
        } else if (daysOfCurrentMonth == 29) {
            forOne()
        } else if (weekdayOfFirstDayOfCurrentMonth >= 4 && daysOfCurrentMonth == 30) {
            forOne()
        } else if (daysOfCurrentMonth == 28) {
            forTwo()
        }

        function forOne() {
            for (let i = weekdayOfFirstDayOfNextMonth; i < 7; i++) {
                const li = document.createElement('li')
                const delta = i - weekdayOfFirstDayOfNextMonth
                const nextMonthDays = new Date(weekdayOfFirstDayOfNextMonth + oneDay * delta)
                li.textContent = nextMonthDays.getDate()
                li.classList.add('calendar-days-gray')
                days.append(li)
            }
        }

        function forTwo() {
            for (let i = weekdayOfFirstDayOfNextMonth; i < 14; i++) {
                const li = document.createElement('li')
                const delta = i - weekdayOfFirstDayOfNextMonth
                const nextMonthDays = new Date(weekdayOfFirstDayOfNextMonth + oneDay * delta)
                li.textContent = nextMonthDays.getDate()
                li.classList.add('calendar-days-gray')
                days.append(li)
            }
        }

    }
}


function nextMoth() {
    const firstDayOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
    main(firstDayOfNextMonth)
}

function lastMoth() {
    const firstDayOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const oneDay = 86400 * 1000
    main(new Date(firstDayOfCurrentMonth - oneDay))
}

function toDay() {
    main(new Date())
}