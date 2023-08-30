// Load Data
const loadData = async (isShowAll) => {
    loading(true);
    const res = await fetch(
        "https://openapi.programming-hero.com/api/ai/tools"
    );
    const data = await res.json();

    const allData = data.data.tools;
    displayData(allData, isShowAll);
};

// Display Data
const displayData = (arrayData, isShowAll) => {
    const dataContainer = document.getElementById("data-container");

    dataContainer.textContent = "";

    const showAllBtn = document.getElementById("btn-show-all");

    if (arrayData.length > 6 && !isShowAll) {
        showAllBtn.classList.remove("hidden");
    } else {
        showAllBtn.classList.add("hidden");
    }

    if (!isShowAll) {
        arrayData = arrayData.slice(0, 6);
        console.log(isShowAll);
    }

    arrayData.forEach((data) => {
        console.log(data);

        const newCart = document.createElement("div");

        newCart.classList = "card card-compact bg-base-100 shadow-xl";
        newCart.innerHTML = `
        <figure class="m-4 mb-0">
            <img
                src="${
                    data?.image ||
                    "https://t4.ftcdn.net/jpg/04/87/28/07/360_F_487280776_70nVPeKBJquslGgmpLrWQuEJ34QKahzR.jpg"
                }"
                
                alt="API"
            />
        </figure>
        
        <div class="card-body">
            <h2 class="card-title text-2xl">Features</h2>
            <ol class="list-decimal list-inside">
                <li>${data.features[0]}</li>
                <li>${data.features[1]}</li>
                <li>${data.features[2]}</li>
            </ol>

            <hr class="my-2" />
            <div class="card-actions justify-between">
                <div class="space-y-2">
                    <h3 class="text-xl font-bold">${data.name}</h3>
                    <div>
                        <i class="fa-solid fa-calendar-days text-[#585858]"></i>
                        <span class="text-[#585858]">${data.published_in}</span>
                    </div>
                </div>
                <button class="btn btn-circle bg-red-50">
                    <i
                        class="fa-solid fa-arrow-right text-lg text-red-500"
                    ></i>
                </button>
            </div>
        </div>
    `;
        dataContainer.appendChild(newCart);
    });

    loading(false);
};

const handleShowAll = () => {
    loadData(true);
    loading(true);
};

const loading = (isLoading) => {
    const loadingProcess = document.getElementById("loading");

    if (isLoading) {
        loadingProcess.classList.remove("hidden");
    } else {
        loadingProcess.classList.add("hidden");
    }
};

loadData();
