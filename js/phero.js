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
<a onclick="tabClick()" class="tab">${category.category}</a> `;
itemContainer.appendChild(categoryButton);

});

}

const tabClick=async()=>{
    const response=await fetch(`https://openapi.programming-hero.com/api/videos/category/1000`);
    const data=await response.json();
    // console.log(data.data)
    const datas=data.data;
    const cardContainer=document.getElementById('card-container');
datas.forEach(element => {
    console.log(element)
    const div=document.createElement('div');
    div.innerHTML=`
    <div class="card  bg-base-100 shadow-xl h-[400px] font-inter">
    <figure><img src="${element.thumbnail}" class="w-full h-[200px]" alt="Shoes" /></figure>
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

tabClick()




handleClick()