let fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348'},
    {id: 2, title: 'Апельсины', price: 30, img: 'https://st2.depositphotos.com/2224328/5261/v/600/depositphotos_52613697-stock-illustration-orange-fruit-with-half-and.jpg'},
    {id: 3, title: 'Манго', price: 40, img: 'https://cdn.metro-cc.ru/ru/ru_pim_352140001001_01.png?maxwidth=480&maxheight=460&format=jpg&quality=80'}
]

const toHTML = fruit => `
    <div class="col">
        <div class="card">
            <img class="card-img-top" style="height: 300px" src="${fruit.img}" alt="${fruit.title}">
            <div class="card-body">
                <h5 class="card-title">${fruit.title}</h5>  
                <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
                <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
            </div>
        </div>
    </div>
`

function render() {
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruits').innerHTML = html
}

render()

const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '400px',
    footerButtons: [
        {text: 'Закрыть', type: 'primary', handler() {
                priceModal.close()
        }}
    ]
})
// const confirmModal = $.modal({
//     title: 'Вы уверены?',
//     closable: true,
//     width: '400px',
//     footerButtons: [
//         {text: 'Отменить', type: 'secondary', handler() {
//                 confirmModal.close()
//         }},
//         {text: 'Удалить', type: 'danger', handler() {
//                 confirmModal.close()
//         }}
//     ]
// })

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)

    if (btnType === 'price') {
        priceModal.setContent(`
            <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)
        priceModal.open()
    }   else if (btnType === 'remove') {
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>`
        }).then(() => {
            fruits = fruits.filter(f => f.id !== id)
            render()
        }).catch(() => {
            console.log('cancel')
        })
        // confirmModal.setContent(`
        //     <p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>
        // `)
        // confirmModal.open()
    }
})
