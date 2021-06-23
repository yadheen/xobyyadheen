const cellelem = document.querySelectorAll('[datacell]');
const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

]

let turn
let flag
start()

function start() {
    console.log(cellelem)
    cellelem.forEach(cell => {
        cell.addEventListener('click', clickevent, { once: true });

    })
}
let temp

function clickevent(e) {
    // console.log("hai")
    const cell = e.target;
    // cell.style.color = "black";

    if (!turn) {
        cell.innerHTML = 'X';
        console.log(cell.innerHTML)

    } else {
        cell.innerHTML = 'O';
        console.log(cell.innerHTML)


    }
    temp = cell.innerHTML
    if (iswin(temp)) {
        console.log("win")
        setTimeout(() => {
            window.alert(`${temp} wins`)
            respawn()



        }, 1000);
    }
    if (isdraw()) {
        console.log(isdraw())
        setTimeout(() => {
            window.alert(`draw`)

            respawn()


        }, 1000);
    }



    turn = !turn
}

function respawn() {
    setTimeout(() => {
        location.reload();
    }, 1000);
}

function isdraw() {
    // flag = false
    // cellelem.forEach(cell => {
    //     console.log(cell.innerHTML)
    //     if (cell.innerHTML == 'X' || cell.innerHTML == 'O') {
    //         flag = true
    //     } else {
    //         return (false)
    //     }
    // })
    // if (flag) {
    //     return (true)

    // }
    return [...cellelem].every(cell => {
        return (cell.innerHTML == 'X' || cell.innerHTML == 'O')
    })
}

function iswin(e) {
    console.log("wincheck")
    console.log(e)
    return win.some(comb => {
        // console.log(comb)
        return comb.every(i => {
            // console.log(cellelem[i].innerHTML)
            // console.log(e)

            return (cellelem[i].innerHTML == (e))

        })
    })

}