class People{
    constructor(id, name, bounty, imgURL){
        this.id = id;
        this.name = name;
        this.bounty = bounty;
        this.imgURL = imgURL;
    }
}

const WantedLetterList = [
    new People(0,"Monkey D. Luffy", "3,000,000,000", "./figs/onepiece01_luffy.png"),
    new People(1,"Roronoa Zoro", "1,111,000,000", "./figs/onepiece02_zoro_bandana.png"),
    new People(2,"Nami", "366,000,000", "./figs/onepiece03_nami.png"),
    new People(3,"Usopp", "500,000,000", "./figs/onepiece04_usopp_sogeking.png"),
    new People(4,"Vinsmoke Sanji", "1,032,000,000", "./figs/onepiece05_sanji.png"),
    new People(5,"Tony Tony Chopper", "1,000", "./figs/onepiece06_chopper.png"),
    new People(6,"Nico Robin", "930,000,000", "./figs/onepiece07_robin.png"),
    new People(7,"Franky ", "394,000,000", "./figs/onepiece08_franky.png"),
    new People(8,"Brook", "383,000,000", "./figs/onepiece09_brook.png"),
    new People(9,"Jinbe", "1,100,000,000", "./figs/onepiece10_jinbe.png")
]
    

//

class Page{

    //HTML作成
    static createHTML(){
        let target = document.getElementById("target");
        //target.classList.add


        //左側
        let sliderDiv = Page.createLeftSection();
        target.append(sliderDiv);

        //右側
        let rightSecDiv = Page.createRightSection();
        target.append(rightSecDiv);
    }

    //手配書表示部分作成
    static createLeftSection(){
        let sliderDiv = document.createElement("div");
        sliderDiv.id = "slider";
        sliderDiv.classList.add("col-12", "col-md-5", "d-flex", "justify-content-center", "align-items-center",  "mx-2", "p-4", "p-md-0");

        let main = document.createElement("div");
        main.classList.add("main", "img-appear", "d-flex", "justify-content-center");
        main.setAttribute("data-index", undefined);
        let extra = document.createElement("div");
        extra.classList.add("extra", "img-disappear");

        sliderDiv.append(main);
        sliderDiv.append(extra);

        return sliderDiv;
    }




    //数値入力部分作成
    static createRightSection(){
        let rightSecDiv = document.createElement("div");
        rightSecDiv.classList.add("col-12", "col-md-5", "align-items-center");

        //手配書No.表示部分
        //let displayDiv = Page.createDisplayDiv("bgcolor-grey","font-kaushan", "text-light");
        //rightSecDiv.append(displayDiv);
        //入力部の表示
        let calculatorDiv = Page.createCalculatorDiv("bgcolor-brown", "border-lightgrey");
        rightSecDiv.append(calculatorDiv);

        return rightSecDiv;
    }

    //現在入力情報表示フォーム
    static createDisplayDiv(bgColor, font, textColor){
        let displayDiv = document.createElement("div");
        displayDiv.classList.add("border", "border-lightgrey", `${bgColor}`,"pt-3");
        displayDiv.innerHTML = `
        <div class="d-flex">
            <p class="col-6 ${font} ${textColor}">Id: </p>
            <input type="text" id="WantedLetterId" style="background-color: transparent; border:none; " class="col-6 ${font} ${textColor} h-50" disabled>
        </div>
        `;
        return displayDiv;
    }

    //入力フォームDiv作成
    static createCalculatorDiv(bgColor, borderColor){
        let calculatorDiv = document.createElement("div");
        calculatorDiv.classList.add("col-12", "d-flex", "justify-content-center", `${bgColor}`, "border", `${borderColor}`, "ps-3");
        let buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("col-11", "d-flex", "flex-wrap");
        calculatorDiv.append(buttonsDiv);

        //数字ボタン作成
        Page.createBtns(buttonsDiv, "btn-light", "border-darkgrey", "font-kaushan", "text-darkgrey");

        return calculatorDiv;
    }

    //Button作成
    static createBtns(buttonsDiv, btnColor, borderColor, font, textColor){
        for(let i = 0; i <= 9; i++){
            let currentBtn = document.createElement("button");
            currentBtn.id = `btn${i}`
            currentBtn.type = "button";
            currentBtn.classList.add("btn", "m-2", "btn-width", "border", `${btnColor}`, `${borderColor}`, `${font}`, `${textColor}`);
            currentBtn.innerHTML = `${i.toString()}`;
            buttonsDiv.append(currentBtn);

            currentBtn.addEventListener("click", function(){
                console.log(i);
                Page.updateWantedLetter(i);
            });

        }
    }
    //Enterボタン未実装
    /*
    static createBtnE(btnColor, borderColor, font, textColor){
        let btnE = document.createElement("button");
        btnE.id = "btnE";
        btnE.type = "button";
        btnE.classList.add("btn", "m-2", "btn-width", "border", `${btnColor}`, `${borderColor}`, `${font}`, `${textColor}`);

        //ここからイベントリスナー書く
    }
*/


    //受け取ったIDの手配書をスライダーに表示する関数
    static updateWantedLetter(nextId){
        let main = document.querySelectorAll(".main").item(0);
        let extra = document.querySelectorAll(".extra").item(0);
        
        let currentId = main.getAttribute("data-index") === undefined ? 0 : parseInt(main.getAttribute("data-index"));
        let nextWantedLetter = WantedLetterList[nextId];

        extra.innerHTML = main.innerHTML;
        main.innerHTML = "";
        main.innerHTML = `
        <div class="box slider-item text-center d-flex flex-column justify-content-center">
            <p class="wanted">WANTED</p>
            <div class="picture-window">
                <img src="${nextWantedLetter.imgURL}">
            </div>
            <p class="doa">DEAD OR ALIVE</p>
            <p class="name">${nextWantedLetter.name}</p>
            <p class="price">$${nextWantedLetter.bounty}-</p>
        </div>
        `;
        main.setAttribute("data-index", `${nextId.toString()}`);

        let sliderDiv = document.getElementById("slider");
        if(nextId >= currentId){
            sliderDiv.innerHTML = "";
            sliderDiv.append(extra);
            sliderDiv.append(main);
        }else{
            sliderDiv.innerHTML = "";
            sliderDiv.append(main);
            sliderDiv.append(extra);
        }
    }
}

//どこかでset

Page.createHTML();

/*
const target = document.getElementById("target");
const sliderItems = document.querySelectorAll(".slider-item");

console.log(sliderItems);

let sliderShow = document.createElement("div");
let main = document.createElement("div");
let extra = document.createElement("div");

sliderShow.classList.add("col-12", "d-flex", "flex-nowrap", "overflow-hiddens");
//overflow-hiddensって何？
main.classList.add("main", "full-width");
extra.classList.add("extra", "full-width");

main.append(sliderShow[0]);


sliderShow.append(main);
sliderShow.append(extra);
target.append(sliderShow);

let controls = document.createElement("div");
controls.classList.add("offset-5", "mt-2");

let leftBtn = document.createElement("button");
leftBtn.classList.add("btn", "btn-light");
leftBtn.innerHTML = "<";

let rightBtn = document.createElement("button");
rightBtn.classList.add("btn", "btn-light");
rightBtn.innerHTML = ">";

controls.append(leftBtn);
controls.append(rightBtn);
target.append(controls);

main.setAttribute("data-index", "0");

// ここからJavaScriptを記述してください。
function slideJump(steps, animationType) {
    let index = parseInt(main.getAttribute("data-index"));
    let currentElement = sliderItems.item(index);

    index += steps;

    if(index < 0) index = sliderItems.length -1;
    else if(index >= sliderItems.length) index = 0;

    let nextElement = sliderItems.item(index);

    main.setAttribute("data-index", index.toString());

    animateMain(currentElement, nextElement, animationType);
}

function animateMain(currentElement, nextElement, animationType) {
    main.innerHTML = "";
    main.append(nextElement);
    
    extra.innerHTML = "";
    extra.append(currentElement);

    main.classList.add("expand-animation");
    extra.classList.add("deplete-animation");
    
    if (animationType === "right"){
        sliderShow.innerHTML = "";
        sliderShow.append(extra);
        sliderShow.append(main);
    } else if (animationType === "left") {
        sliderShow.innerHTML = "";
        sliderShow.append(main);
        sliderShow.append(extra);
    }
}

// 右ボタンをクリックした時に右方向へスライドし、左ボタンをクリックすると左方向へスライドするaddEventListenerを追加してください。

leftBtn.addEventListener("click", function(){
    slideJump(-1, "left");
});

rightBtn.addEventListener("click", function(){
    slideJump(+1, "right");
})*/