
const issueContainer = document.getElementById("issuesContainer")
//console.log(issueContainer)
const totalIssues = document.getElementById("totalCount")

window.addEventListener('popstate', function(event){

})





async function loadIssues(){
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json();
    displayIssues(data.data);
    console.log(data.data);
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
    issues.forEach(issue => {
        totalIssues.innerText = issues.length;
       
        const issueCard = document.createElement("div");
        issueCard.className =`max-w-[256px] shadow-md border-t-3 ${issue.status == "open"
            ?"border-[#00A96E]" 
            : "border-[#A855F7]"
        } px-4 py-4 rounded-[8px] space-y-4 `;
        issueCard.innerHTML = `
            <div  class="flex justify-between items-center onclick = "openIssueDetails(${issue.id})"">
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
                <p class="line-clamp-2">${issue.description}</p>
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
            <`;
            issueContainer.appendChild(issueCard)

    });
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

const modalTeitel = document.getElementById("modal-teitel")
console.log(modalTeitel)
const issueModal = document.getElementById("issueModal")

async function  openIssueDetails(issueId) {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`);
    const data = await res.json();
    //console.log(data.data)
    //const issueDetails = data.data;
    modalTeitel = data.title;
    console.log(modalTeitel)
    issueModal.showModal();

}
openIssueDetails()