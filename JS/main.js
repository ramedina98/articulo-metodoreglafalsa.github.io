//editamos otra vez... 
const btnSwitch = document.querySelector('.switch');
const mainElement = document.querySelector('.cont_car_all');
const mainEtiquetas = document.querySelector('.etiquetas');
const btnShowMoere = document.querySelector('.vermas');
const publicidad = document.querySelector('.cont_publicidad');
//This array has a lot of img of publicity...
const publicityImges = [
    "https://cdn.milenio.com/uploads/media/2019/09/19/estima-proximas-semanas-servicio-comida.jpg",
    "https://pbs.twimg.com/media/FPv_RiIVUA4FqwE.png:large",
    "https://controlpublicidad.com/uploads/2019/11/subway-sandwich-102910.jpg",
    "https://mktadstrategies.files.wordpress.com/2017/10/m24.png",
    "https://controlpublicidad.com/uploads/2020/06/ambar-muy-muy-especial-111913.jpg",
    "https://static.vecteezy.com/system/resources/previews/000/444/427/non_2x/beer-advertisement-design-poster-template-for-classic-white-beer-ad-package-design-vector.jpg",
    "https://imagenes.elpais.com/resizer/YBoqMESBgeU0dCNyGerEsX4FE9U=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/TNBPUFT4G2P53NY76R2X2SM2DQ.jpg",
    "https://www.marketingdirecto.com/wp-content/uploads/2015/06/apple_watch.jpg",
    "https://controlpublicidad.com/includes/thumb.php?src=https://controlpublicidad.com/uploads/2022/01/subway-lanza-queso-vegano-120532.jpg&h=400&zc=1&q=90&a=t"
]
//Este codigo es para trabajar el modo dark
btnSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    btnSwitch.classList.toggle('active');
});
//this function helps us to show in little articles the info...
function makeArticles(imagen, subT, sublink , axtracto, link){
    //start creating the elements...
    //This is the main div that content all the itemes of the article...
    const father = document.createElement('div');
    father.classList.add('cont_car');
    //
    const linkWeb = document.createElement('a');
    linkWeb.classList.add('linkWeb');
    linkWeb.href = `${link}`;
    //this div content the img...
    const imgDestacada = document.createElement('div');
    imgDestacada.classList.add('cont_img');
    imgDestacada.style.backgroundImage = `url(${imagen})`;
    //this div content the sub title and the abstract...
    const abstractNtitle = document.createElement('div');
    abstractNtitle.classList.add('cont_info_car');
    //child div of abstracNtitle, this has the sub title... 
    const subDiv = document.createElement('div');
    subDiv.classList.add('tema');
    //
    const tema = document.createElement('a');
    tema.classList.add('etiquetass');
    tema.href = `${sublink}`;
    //this is the span that is in subDiv...
    const subTitle = document.createElement('span');
    subTitle.innerText = `${subT}`;
    //child div of abstracNtitle, this has the abstrac...
    const abstractDiv = document.createElement('div');
    abstractDiv.classList.add('pre');
    //this is the <p></p> (abstrac)...
    const abstracText = document.createElement('p');
    abstracText.innerText = `${axtracto}`;

    mainElement.appendChild(father);
    father.appendChild(linkWeb);
    linkWeb.appendChild(imgDestacada);
    father.appendChild(abstractNtitle);
    abstractNtitle.appendChild(subDiv);
    subDiv.appendChild(tema);
    tema.appendChild(subTitle);
    abstractNtitle.appendChild(abstractDiv);
    abstractDiv.appendChild(abstracText);
}
//this function makes randonme numbers...
function RandomeNumbers(rango) {
    const numAleatorio = Math.random();
    const numEntero = Math.floor(numAleatorio * rango); // Genera números del 0 al 23

    return numEntero;
}
//This function helps us to clean the sider if there are articles whem we click btn ver mas...
function deleteArticles(){
    mainElement.innerHTML = "";
}
/*Function that helps us to get the info from the api...*/
const loadArticles = async() => {
    try{
        //here we make a request...
        const answer = await fetch("https://ramedina98.github.io/api_nat/db.json");
        //if the answer is correct...
        if(answer.status === 200){
            //get the information...
            const data = await answer.json();
            let x = 0;
            let nums = [];
            let num;
            //Maker of randome numbers...
            do{
                num = RandomeNumbers(data.length);
                if(x === 0){
                    nums[0] = num;
                    x++;
                }
                else if(x === 1){
                    if(num !== nums[0]){
                        nums[1] = num;
                        x++;
                    }
                }
                else if(x === 2){
                    if(num !== nums[0] && num !== nums[1]){
                        nums[2] = num;
                        x++;
                    }
                }
            }while(x !== 3);
            x = 0; 
            //we send the data to the function that creates the HTML...
            do{
                let i = nums[x];
                makeArticles(data[i].imagen, data[i].subTitulo, data[i].subLink, 
                    data[i].extracto, data[i].linkWeb);
                x++; 
            }while(x !== 3);
        }
    }catch(error){
        console.log(error);
    }
}
loadArticles();
//this btn refreshes the sider and shows new articles...
btnShowMoere.addEventListener('click', (e) => {
    e.preventDefault();
    deleteArticles();
    loadArticles();
});
//this funtion makes
let x = 0; 
let j = 0;
function rotateAdvertinsing(){
    let i;
    i = RandomeNumbers(publicityImges.length);
    while(i === x || i === j){
        i = RandomeNumbers(publicityImges.length);
    }
    j = x;
    x = i;
    publicidad.style.backgroundImage = `url(${publicityImges[i]})`;
}
rotateAdvertinsing();
setInterval(rotateAdvertinsing, 30000);