// on click event to mark task as completed
$("document").ready(function () {
    $('#completed').on('click', function () {
        color(this);
    })

});
//   on click event to mark task as important
$("document").ready(function () {

    $('#priority').on('click', function () {
        color(this);
    })

});
//   on click event to mark task as archived
$("document").ready(function () {

    $('#archive').on('click', function () {
        color(this);
    })

});
// to add new tasks
function addTasks() {
    var x = $('.task-body--view').css("display", "none");
    reveal();
}
// to display new task form
function reveal() {
    $('.task-body--add').css("display", "inline");
    $(".new-form")[0].reset();
}
// to exit new task form
function goback() {
    $('.task-body--add').css("display", "none");
    $('.task-body--view').css("display", "block");
}
// to hide search icon
function hide() {
    $('#search-icon').css("visibility", "hidden");
}
// to bring back search icon
function show() {
    $('#search-icon').css("visibility", "visible");
}

function colorCompleted(obj) {
    var altName = obj.alt;
    console.log(altName);
    var retrievedObject = localStorage.getItem('dataSet');
    var x = JSON.parse(retrievedObject);
    for (var i = 0; i < x.length; i++) {
        if (x[i].TaskName == altName) {
            if (x[i].isCompleted == false) {
                obj.style.filter = "grayscale(0)";
                x[i].isCompleted = true;
                localStorage.setItem('x', JSON.stringify(x));
                dataSet = x;
                var dataSet = localStorage.setItem('dataSet', JSON.stringify(dataSet));
                history.go(0);

            } else {
                x[i].isCompleted = false;
                localStorage.setItem('x', JSON.stringify(x));
                dataSet = x;
                var dataSet = localStorage.setItem('dataSet', JSON.stringify(dataSet));
                obj.style.filter = "grayscale(1)";
                location.reload(true);
            }
        }
    }
}

function reloadPage() {
    location.reload(true);
}
// for archive
function colorArchived(obj) {
    var altName = obj.alt;
    console.log(altName);
    var retrievedObject = localStorage.getItem('dataSet');
    var x = JSON.parse(retrievedObject);
    for (var i = 0; i < x.length; i++) {
        if (x[i].TaskName == altName) {
            if (x[i].isArchived == false) {
                obj.style.filter = "grayscale(0)";
                x[i].isArchived = true;
                localStorage.setItem('x', JSON.stringify(x));
                dataSet = x;
                var dataSet = localStorage.setItem('dataSet', JSON.stringify(dataSet));
                location.reload(true);

            } else {
                x[i].isArchived = false;
                localStorage.setItem('x', JSON.stringify(x));
                dataSet = x;
                var dataSet = localStorage.setItem('dataSet', JSON.stringify(dataSet));
                obj.style.filter = "grayscale(1)";
                location.reload(true);
            }
        }
    }
}
// for priority
function colorImportant(obj) {
    var altName = obj.alt;
    console.log(altName);
    var retrievedObject = localStorage.getItem('dataSet');
    var x = JSON.parse(retrievedObject);
    for (var i = 0; i < x.length; i++) {
        if (x[i].TaskName == altName) {
            if (x[i].isImportant == false) {
                obj.style.filter = "grayscale(0)";
                x[i].isImportant = true;
                localStorage.setItem('x', JSON.stringify(x));
                dataSet = x;
                var dataSet = localStorage.setItem('dataSet', JSON.stringify(dataSet));
                // createCard();
                location.reload(true);

            } else {
                x[i].isImportant = false;
                localStorage.setItem('x', JSON.stringify(x));
                dataSet = x;
                var dataSet = localStorage.setItem('dataSet', JSON.stringify(dataSet));
                obj.style.filter = "grayscale(1)";
                createCard();
                location.rseload(true);
            }
        }
    }


}


// initialize dataSet array to null or previous object if defined.
// call object create method on submit
$(document).ready(function () {
    var dataSet = JSON.parse(localStorage.getItem("dataSet")) || [];
    $(document).on('submit', '.new-form', function () {
        var tDDate = new Date();
        var tName = $('.new-form').find('input[name="taskName"]').val();
        var tDesc = $('.new-form').find('input[name="taskDesc"]').val();
        var tTags = $('.new-form').find('input[name="taskTags"]').val();
        var tDDate = $('.new-form').find('input[name="taskDDate"]').val();
        var tADate = $('.new-form').find('input[name="taskADate"]').val();
        var tColor = $('.new-form').find('input[name="taskColor"]').val();
        var itemSet = {
            'Id': Math.floor(Math.random() * 999),
            'TaskName': tName,
            'TaskDec': tDesc,
            'TaskTags': tTags,
            'DueDate': tDDate,
            'AssignDate': tADate,
            'TaskColor': tColor,
            'isCompleted': false,
            'isImportant': false,
            'isArchived': false
        };
        dataSet.push(itemSet);
        localStorage.setItem('dataSet', JSON.stringify(dataSet));
        createTask(tName, tDesc, tTags, tDDate, tADate, tColor);
        goback();
        // return false;
    });
});
// create new task
function createTask(tName, tDesc, tTags, tDDate, tADate, tColor) {
    var card_element = '<div class="result-container"> <div class="title-item"> <div class="task-color" style="background-color:' + tColor + '"></div> <h3>' + tName + '</h3> <p>' + tDesc + '</p> </div> <div class="date-item"> <p>Due Date:' + tDDate + '</p> </div> <div class="icons-item"> <img id="completed" class="sIcon" alt="' + tName + '" onclick="colorCompleted(this)" src="/Task Manager/images/outline-done-24px.svg" alt="complete"> <img id="priority" onclick="colorImportant(this)" alt="' + tName + '" class="sIcon" src="/Task Manager/images/outline-star_border-24px (1).svg"> <img id="archive" class="sIcon" alt="' + tName + '" onclick="colorArchived(this)" src="/Task Manager/images/outline-archive-24px.svg"> </div> </div>'
    $("#search-re").append(card_element);
}
// to load tasks on refrest
$(document).ready(function () {
    var retrievedObject = localStorage.getItem('dataSet');
    var x = JSON.parse(retrievedObject);
    var i = 0;

    for (i = 0; i < x.length; i++) {
        var imp = 1,
            arc = 1,
            com = 1;
        // check if imp in local storage
        if (x[i].isImportant == true) {
            imp = 0;
        }
        // check if archived in local storage
        if (x[i].isArchived == true) {
            arc = 0;
        }
        // check if completed in local storage
        if (x[i].isCompleted == true) {
            com = 0;
        }
        var card_element = '<div class="result-container"> <div class="title-item"> <div class="task-color" style="background-color:' + x[i].TaskColor + '"></div> <h3>' + x[i].TaskName + '</h3> <p>' + x[i].TaskDec + '</p> </div> <div class="date-item"> <p>Due Date:' + x[i].DueDate + '</p> </div> <div class="icons-item"> <img id="completed" alt="' + x[i].TaskName + '" class="sIcon" onclick="colorCompleted(this)" style="filter:grayscale(' + com + ')" src="/Task Manager/images/outline-done-24px.svg"> <img id="priority" class="sIcon" alt="' + x[i].TaskName + '" onclick="colorImportant(this)" style="filter:grayscale(' + imp + ')" src="/Task Manager/images/outline-star_border-24px (1).svg"> <img id="archive" class="sIcon" alt="' + x[i].TaskName + '" onclick="colorArchived(this)" style="filter:grayscale(' + arc + ')" src="/Task Manager/images/outline-archive-24px.svg"> </div> </div>'
        $("#search-re").append(card_element);

    }

})

// to load top 3 tasks after refresh
$(document).ready(function createCard() {
    var retrievedObject = localStorage.getItem('dataSet');
    var x = JSON.parse(retrievedObject);
    var i = 0;

    for (i = (x.length - 1); i > (x.length - 4); i--) {
        var imp = 1,
            arc = 1,
            com = 1;
        // check if imp in local storage
        if (x[i].isImportant == true) {
            imp = 0;
        }
        // check if archived in local storage
        if (x[i].isArchived == true) {
            arc = 0;
        }
        // check if completed in local storage
        if (x[i].isCompleted == true) {
            com = 0;
        }
        var card = ' <div class="task-body__card--preview"> <div id="tag-color" style="background-color:' + x[i].TaskColor + '"></div> <h5>' + x[i].TaskName + '</h5> <div id="sep"></div> <p>' + x[i].TaskDec + '</p> <div class="date-c"> <img src="../Task Manager/images/outline-calendar_today-24px.svg" id="card-calendar"> <p id="due-date">' + x[i].DueDate + '</p> </div> <div class="icons"> <img src="../Task Manager/images/outline-done-24px.svg" alt="' + x[i].TaskName + '" id="completed" onclick="colorCompleted(this)" style="filter:grayscale(' + com + ')"> <img src="../Task Manager/images/outline-star_border-24px (1).svg" alt="' + x[i].TaskName + '" id="priority" onclick="colorImportant(this)" style="filter:grayscale(' + imp + ')"> <img src="../Task Manager/images/outline-archive-24px.svg" alt="' + x[i].TaskName + '" id="archive" onclick="colorArchived(this)" style="filter:grayscale(' + arc + ')"> </div> </div>'
        $(".featured-task--container").append(card);

    }

})
//search functiom
function search() {
    var input, filter, ul, li, a, i, txtValue, co;
    input = document.getElementById("tSearch");
    filter = input.value.toUpperCase();
    ul = document.getElementById("search-re");
    co = document.getElementsByClassName("result-container")
    li = ul.getElementsByClassName("title-item");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("h3")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            co[i].style.display = "";
        } else {
            co[i].style.display = "none";
        }
    }
}

// toaster
function toaster() {
    var x = document.getElementById("toaster");
    x.className = "show";
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 3000);
}


// $("button.asda").click(function(){
//     var id_of_the_task = $('asdsada').att("id");
//     DataSet[id_of_the_task].isImp ? DataSet[id_of_the_task].isImp ==false :   DataSet[id_of_the_task].isImp ==true


// });