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
                <button onclick="loadShowDetailsData('${
                    data.id
                }'); show_details_modal.showModal()" class="btn btn-circle bg-red-50">
                    <i class="fa-solid fa-arrow-right text-lg text-red-500"></i>
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

const loadShowDetailsData = async (id) => {
    // console.log(id);
    const res = await fetch(
        `https://openapi.programming-hero.com/api/ai/tool/${id}`
    );
    const data = await res.json();

    const dataArray = data.data;

    showDetails(dataArray);
};

const showDetails = (data) => {
    console.log(data);

    const showDetailsContainer = document.getElementById(
        "show-details-container"
    );

    // const openShowDetails = document.createElement("div");

    showDetailsContainer.innerHTML = `

        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

        <div class="flex justify-between gap-2 mt-4">
        <div
            class="bg-red-50 border-red-500 border-2 p-4 rounded-md space-y-7 w-6/12"
        >
            <p class="text-xl font-bold">
                ${data.description}
            </p>

            <div class="flex justify-between gap-2">
                <p
                    class="bg-white p-2 text-center font-bold rounded-lg text-green-500"
                >
                    ${data.pricing[0].price} ${data.pricing[0].plan}
                </p>
                <p
                    class="bg-white p-2 text-center font-bold rounded-lg text-orange-500"
                >
                    ${data.pricing[1].price} ${data.pricing[1].plan}
                </p>
                <p
                    class="bg-white p-2 text-center font-bold rounded-lg text-red-500"
                >
                    ${data.pricing[2].price} ${data.pricing[2].plan}
                </p>
            </div>

            <div class="flex justify-between gap-2 text-sm">
                <div>
                    <h4 class="font-bold text-lg">
                        Features
                    </h4>
                    <ul
                        class="list-disc list-inside space-y-2"
                    >
                        <li>${data.features[1].feature_name}</li>
                        <li>${data.features[2].feature_name}</li>
                        <li>${data.features[3].feature_name}</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-lg">
                        Integrations
                    </h4>
                    <ul class="list-disc list-inside space-y-2">
                        <li>${data.integrations[0]}</li>
                        <li>${data.integrations[1]}</li>
                        <li>${data.integrations[2]}</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 2 -->
        <div
            class="w-6/12 p-3 bg-white border-gray-200 border-2 rounded-md relative"
        >
            <button
                class="btn btn-primary bg-red-500 text-white text-xs border-none absolute right-4 top-4"
            >
                ${data.accuracy.score}% Accuracy
            </button>
            <img
                class="rounded-md"
                src="${data.image_link[0]}"
                alt=""
            />

            <div class="text-center space-y-2 mt-4">
                <h2 class="text-xl font-bold">
                    Hi, how are you doing today?
                </h2>
                <p>
                    I'm doing well, thank you for asking.
                    How can I assist you today?
                </p>
            </div>
        </div>
    </div>
    `;

    // showDetailsContainer.appendChild(openShowDetails);
};
