let mainCategoryId=1000;

const handleClick = async() =>{
const response=await fetch('https://openapi.programming-hero.com/api/videos/categories');
const data=await response.json();
const category=data.data;
// console.log(category)

const itemContainer=document.getElementById("items-container");
category.forEach(category => {
    // console.log(category.category)
    const categoryName=category.category;
    // console.log(categoryName)
const categoryButton=document.createElement("div");
categoryButton.classList=' bg-gray-200 p-1  hover:bg-red-500 hover:text-white';
categoryButton.innerHTML=`
<a onclick="tabClick('${category.category_id}')" class="tab">${category.category}</a> `;
itemContainer.appendChild(categoryButton);

});

}
const secToHoursAndMin=(time)=>{
    const hours=Math.floor(time/3600);
    const mins=parseInt((time %3600) /60);
    return `${hours} hours ${mins} minutes ago`;
            }

const tabClick=async(category_id)=>{
    mainCategoryId=category_id;
    const response=await fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`);
    const data=await response.json();
    // console.log(data.data)
    const datas=data.data;
    const cardContainer=document.getElementById('card-container');
    cardContainer.innerHTML=" ";
if(data.status ==true && datas.length>0){
    datas.forEach(element => {
        console.log(element)
        const div=document.createElement('div');
        const sec=parseFloat(element?.others?.posted_date);
        div.innerHTML=`
        <div class="card  bg-base-100 shadow-xl h-[400px] font-inter">
        <figure><img src="${element.thumbnail}" class="w-full h-[200px] relative" alt="Shoes" /></figure>
        
        ${element?.others?.posted_date ? `
        <h6 class="font-medium text-base bg-black text-white absolute p-1 text-right bottom-52 right-3">${secToHoursAndMin(sec)}</h6>` : ''}
        <div class="card-body">
            <div class="card-footer flex justify-between mt-8">
            <div class="flex gap-2">
            <div>
            <img src="${element?.authors[0]?.profile_picture}" class="w-[40px] h-[40px] rounded-full" alt="Shoes" />
            </div>
            <div>
            <h6 class="font-bold text-base">${element?.title}</h6>
            <div class="flex gap-3">
            <small class="font-normal text-sm">${element?.authors[0]?.profile_name}</small>
            ${element?.authors[0]?.verified ?'<img src="../correct.png" class="w-[20px] h-[20px]" />':'' 
            }
            </div>
            </div>
            </div>
            </div>
            <div class="card-actions">
            <h6 id="views" class="px-12 font-normal text-sm">${element?.others?.views} views</h6>
            </div>
        </div>
    </div>
        `;
  
        
        // console.log(secToHoursAndMin(sec))
        const div1 =document.getElementById('no-data-available');
        div1.classList.add('hidden');
        cardContainer.appendChild(div);
     
    });
}
    else {
        const div =document.getElementById('no-data-available');
        div.classList.remove('hidden');
    }
}   

const sortClick = async (category_id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`);
    const data = await response.json();
    const datas = data.data;
  
    datas.sort((a, b) => {
      const viewsA = parseFloat(a.others.views.replace('k','000'));
      const viewsB = parseFloat(b.others.views.replace('k','000'));
      return viewsB - viewsA;
    });
  
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
  
    if(data.status ==true && datas.length>0){
        datas.forEach(element => {
            // console.log(element)
            const div=document.createElement('div');
            const sec=parseFloat(element?.others?.posted_date);
            div.innerHTML=`
            <div class="card  bg-base-100 shadow-xl h-[400px] font-inter">
            <figure><img src="${element.thumbnail}" class="w-full h-[200px] relative" alt="Shoes" /></figure>
            
            ${element?.others?.posted_date ? `
            <h6 class="font-medium text-base bg-black text-white absolute p-1 text-right bottom-52 right-3">${secToHoursAndMin(sec)}</h6>` : ''}
            <div class="card-body">
                <div class="card-footer flex justify-between mt-8">
                <div class="flex gap-2">
                <div>
                <img src="${element?.authors[0]?.profile_picture}" class="w-[40px] h-[40px] rounded-full" alt="Shoes" />
                </div>
                <div>
                <h6 class="font-bold text-base">${element?.title}</h6>
                <div class="flex gap-3">
                <small class="font-normal text-sm">${element?.authors[0]?.profile_name}</small>
                ${element?.authors[0]?.verified ?'<img src="../correct.png" class="w-[20px] h-[20px]" />':'' 
                }
                </div>
                </div>
                </div>
                </div>
                <div class="card-actions">
                <h6 id="views" class="px-12 font-normal text-sm">${element?.others?.views} views</h6>
                </div>
            </div>
        </div>
            `;
      
        
            
            cardContainer.appendChild(div);
         
        });
    }
        else {
            const div =document.getElementById('no-data-available');
            div.classList.remove('hidden');
        }

      
    }

    document.getElementById("sortClickButton").addEventListener('click' ,function(){        
    sortClick(mainCategoryId);
});
        
  

handleClick()
tabClick(1000)