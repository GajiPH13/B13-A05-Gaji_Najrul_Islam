
const issueContainer = document.getElementById("issuesContainer")
//console.log(issueContainer)
const totalIssues = document.getElementById("totalCount")

const allIssueBtns = document.getElementById("btnContainer")
window.addEventListener('popstate', function(event){

})




async function loadIssues(){
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json();
    displayIssues(data.data);
    //console.log(data.data);
}
loadIssues()






// {
// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"
// }


function displayIssues(issues){
    manageSpinner(true)
    issuesContainer.innerHTML = "";
    issues.forEach(issue => {
        totalIssues.innerText = issues.length;
       
        const issueCard = document.createElement("div");
        issueCard.className =`max-w-[256px] shadow-md border-t-3 ${issue.status == "open"
            ?"border-[#00A96E]" 
            : "border-[#A855F7]"
        } px-4 py-4 rounded-[8px] space-y-4 `;
        issueCard.innerHTML = `
        <div onclick = "loadIssueDetail(${issue.id})" class = "space-y-3">
            <div onclick = "loadIssueDetail(${issue.id})" class="flex justify-between items-center >
                <img src="./assets/Open-Status.png" alt="" srcset="">
                <div class="badge badge-md  font-semibold px-6 
                    ${issue.priority === 'low' ? 'bg-[#EEEFF2] text-[#9CA3AF]'  : 
                    issue.priority === 'high' ? 'bg-[#FEECEC] text-[#EF4444]' : 
                    issue.priority === 'medium' ? 'bg-[#FFF6D1] text-[#F59E0B]' : 'bg-ghost'
                    }
                ">${issue.priority}</div>    
            </div>
            <div class="space-y-4">
                <h3 class="font-bold">${issue.title}</h3>
                <p class="line-clamp-2 mt-3">${issue.description}</p>
            </div>
            <div class="flex justify-center items-center">
                
                <div class=" badge badge-md bg-[#FEECEC]"><img src="./assets/BugDroid.png" alt="" srcset="">${issue.labels[0]}</div>
                
                <div class="flex justify-center items-center truncate badge badge-md bg-[#FDE68A]"><img src="./assets/Lifebuoy.png" alt="" srcset="">${issue.labels[1]}</div>
            </div>
            <hr class="border-base-300">
            <div class="space-y-4">
                <p>#1by ${issue.author}</p>
                <p>${issue.createdAt}</p>
            </div>
        </div>
            `;
            issueContainer.appendChild(issueCard)

    });
    manageSpinner(false);
};




const loadIssueDetail = async(id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
   // console.log(url)
   const res = await fetch(url);
   const details = await res.json();
   displayIsuueDetails(details.data)
}

// {
// "id": 33,
// "title": "Add bulk operations support",
// "description": "Allow users to perform bulk actions like delete, update status on multiple items at once.",
// "status": "open",
// "labels": [
// "enhancement"
// ],
// "priority": "low",
// "author": "bulk_barry",
// "assignee": "",
// "createdAt": "2024-02-02T10:00:00Z",
// "updatedAt": "2024-02-02T10:00:00Z"
// }

const displayIsuueDetails = (issue) => {
    //console.log(issue)
    const detailsBox = document.getElementById("details-container")
    detailsBox.innerHTML =`


                <div class="space-y-4">
                    <h3 id="modal-teitel" class="font-bold text-2xl">Fix broken image uploads</h3>
                    <div class="flex justify-between items-center gap-2 ">
                    <div id="modal-status" class=" gap-1 badge badge-md bg-[#00A96E] text-white">Opened</div>
                        <ul class="flex gap-2">
                            <li id="issue-author">Opened by Fahim Ahmed</li>
                            <li id="issue-date">22/02/2026</li>
                        </ul>
                    </div>
                </div>
                <div class ="mt-3">
                     <div id="badge-bug" class=" badge badge-md bg-[#FEECEC]"><img src="./assets/BugDroid.png" alt="" srcset="">BUG</div>
                      <div id="badge-help" class=" badge badge-md bg-[#FEECEC]"><img src="./assets/Lifebuoy.png" alt="" srcset="">HELP WANTED</div>
                </div>
                <p id="issue-description" class ="mt-3">The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.</p>
                <div class="flex justify-between  flex-l mt-6 bg-[#F8FAFC] px-4 py-4">
                <div>
                    <p>Assignee</p>
                    <p id="assign-author">Fahim Ahmed</p>

                </div>
                <div class="flex flex-col justify-start">
                    <p>Priority</p>
                    <div id="issue-priority" class=" badge badge-md bg-[#EF4444] text-white">HIGH</div>
                </div>
                </div>
                `;
                document.getElementById('issueModal').showModal();
}

// function for spinner
const manageSpinner = (status) =>{
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden")
        document.getElementById("issuesContainer").classList.add("hidden")
    }else{
        document.getElementById("spinner").classList.add("hidden")
        document.getElementById("issuesContainer").classList.remove("hidden")
    }
}

//function search

document.getElementById("btn-search").addEventListener('click', function() {
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    
    manageSpinner(true); // Start spinner immediately

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    .then(res => res.json())
    .then(data => {
        const allIssues = data.data;
        
        // Ensure you are filtering by the correct property (title)
        const filterWords = allIssues.filter(issue => 
            
            issue.title.toLowerCase().includes(searchValue)
        );

        displayIssues(filterWords);
        btn.classList.remove("btn-primary");
    })
    .catch(err => {
        console.error("Search Error:", err);
        manageSpinner(false);
    });
});



// toggel between buttons*****
const container = document.getElementById('btnContainer');
const buttons = container.querySelectorAll('button');

container.addEventListener('click', (e) => {
    const clickedBtn = e.target.closest('button');
    if (!clickedBtn) return;

    // 1. Reset all buttons to the "unselected" state
    buttons.forEach(btn => {
        btn.classList.remove('btn-primary', 'text-white');
        btn.classList.add('bg-transparent', 'text-[#64748B]');
    });

    // 2. Apply "selected" state to the clicked button
    clickedBtn.classList.remove('bg-transparent', 'text-[#64748B]');
    clickedBtn.classList.add('btn-primary', 'text-white');
    loadIssues()
});

const openBtn = document.getElementById('openBtn')
const closedBtn = document.getElementById('closedBtn')

openBtn.addEventListener('click', () =>{
    manageSpinner(true);
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/`)
    .then(res => res.json())
    .then(data => {
        const alldata = data.data
        const openIssues = alldata.filter(issue => issue.status === "open");
        
        displayIssues(openIssues);
    });
});

closedBtn.addEventListener('click', () =>{
    manageSpinner(true);
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/`)
    .then(res => res.json())
    .then(data => {
        const alldata = data.data
        const closedIssues = alldata.filter(issue => issue.status === "closed");
        
        displayIssues(closedIssues);
    });
});

