

let currentSalary = 10000;
let currentAssets = 40000;
let currentInsurance = 2000;
let currentFoodCost = 2000;
let currentRent = 2000;
let wishAmount = 1000;

let totalInvestment = 0;

let number_of_wishes = 5.0;





//TIMER

let profit_per_year = number_of_wishes * (currentSalary - currentRent - currentInsurance - currentFoodCost - wishAmount) + (12 - number_of_wishes) * (currentSalary - currentRent - currentFoodCost - currentInsurance);
let amount = 1000000.0 - currentAssets;
let n = amount / profit_per_year;



var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();
var now1 = new Date().getTime();
countDownDate = now1 + n;

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
//   var distance = countDownDate - now;
  var distance = (n * (365) * (24) * (60) * (60) * (1000))+now1 - now;
  console.log(distance);
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);










function openFormWishlist() {
    document.getElementById("myForm-wishlist").style.display = "block";
  }
  
  function closeFormWishlist() {
    document.getElementById("myForm-wishlist").style.display = "none";
  }




  async function enterFormWishlist(){
      document.getElementById("myForm-wishlist").style.display = "none";
      let wishlistInput = document.getElementById("wishlistItemForm").value;
      const newWishlistItem = document.createElement("div");
      const newWishlistItemText = document.createTextNode(wishlistInput);
      newWishlistItem.appendChild(newWishlistItemText);
      const wishlistContainer = document.querySelector(".column_container_wishlist");
      wishlistContainer.appendChild(newWishlistItem);
      let object1 = await postData('/all', {wishInp : wishlistInput});

        let newElementText1 = document.createTextNode(object1.lowestPrice);
        let newElementText2 = document.createTextNode(object1.highestPrice);
        let image = document.createTextNode(object1.name);




        let blog_container = document.querySelector(".blog_container");
        let newElement1 = document.createElement("div");
        let newElement2 = document.createElement("div");
        let newElement3 = document.createElement("div");


        newElement1.appendChild(newElementText1);
        newElement1.appendChild(newElementText2);
        newElement1.appendChild(newElementText3);

        blog_container.appendChild(newElement1);
        blog_container.appendChild(newElement2);
        blog_container.appendChild(newElement3);
  }




  function enterInitialForm(){
    document.getElementById("myInitialForm").style.display = "none";
    currentSalary = document.getElementById("salaryForm").value;
    currentAssets = document.getElementById("currentAssetsForm").value;
    currentFoodCost = document.getElementById("currentFoodForm").value;
    currentInsurance = document.getElementById("currentInsuranceForm").value;
    currentRent = document.getElementById("currentRentForm").value;

    const newTextSalary = document.createTextNode(currentSalary);
    document.getElementById("SalaryShow").appendChild(newTextSalary);
    const newTextFood = document.createTextNode(currentFoodCost);
    document.getElementById("FoodShow").appendChild(newTextFood);
    const newTextRent = document.createTextNode(currentRent);
    document.getElementById("RentShow").appendChild(newTextRent);
    const newTextInsurance = document.createTextNode(currentSalary);
    document.getElementById("InsuranceShow").appendChild(newTextInsurance);

    


    let element = document.getElementById("myInitialForm");
    element.parentElement.removeChild(element);
  }


let vara;
  function openFormInvestment(){
        document.getElementById("myFormInvestment").style.display = "block";
        console.log("ENTERED the invest");
        vara = postData('./allStock', {stockName : 'TSLA'});
    };
     

  function enterFormInvestment(){
    document.getElementById("myFormInvestment").style.display = "none";
}

function closeFormInvestment(){
    document.getElementById("myFormInvesment").style.display = "none";
}




  const postData = async (url = '', data = {}) => {
    console.log("Post entered");
    const response = await fetch(url, {
        method : 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newPostData = await response.json();
        console.log(`The new data is ${newPostData[0]["date"]}`);
        //alert(  JSON.stringify(newPostData)  );
        return newPostData;
    }catch(error){
        console.log(`The error is: ${error}`);
    }
}










//   let wishlistColumn = document.querySelector(".enter-wishlist");
//   wishlistColumn.addEventListener('click', enterFormWishlist);







    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [101839000000, 88186000000, 84263000000, 93626000000, 70537000000, 64304000000],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive : true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });


