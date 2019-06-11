$(document).ready(function () {
    // Control variables
    let todoItems = [];
    const inputCtrl = createInputController($("#todo-list__action-input"));

    // Load initial data
    getJsonContent("data/data.json").then(data => {
        todoItems = data;
        completedTodoItems = data.filter(
            element => element.completed === true
        );
        $("#all-items-container").append(
            createTodoHTMLPartial(todoItems)
        );
    });

    // Setup button click() event!
    $("#todo-list__action-btn").click(function () {
        const itemText = inputCtrl.getText();
        todoItems = addTodoItem(itemText, todoItems);
        $("#all-items-container").html(
            createTodoHTMLPartial(todoItems)
        );
        inputCtrl.clear();
    });

    function addTodoItem(itemName, todoList) {
        const lastId = todoList[todoList.length - 1].id;
        return [
            ...todoList, {
                "name": itemName,
                "completed": false,
                "id": lastId + 1
            }];
    }

    function createInputController(input$) {
        return {
            getText: () => input$.val(),
            clear: () => input$.val("")
        }
    }

    function createTodoHTMLPartial(todoList) {
        const idGenerator = id => `customCheck${id}`;
        const checkboxList = $("<div/>", {
            class: "row"
        });

        todoList.forEach(element => {
            const elementId = idGenerator(element.id);
            checkboxList.append(
                $('<div/>', {
                    class: 'col-12'
                }).append(
                    $('<div/>', {
                        class: 'custom-control custom-checkbox'
                    }).append(
                        $('<input/>', {
                            class: 'custom-control-input',
                            type: 'checkbox',
                            id: elementId,
                            ...element.completed && { checked: true }
                        })
                    ).append(
                        $('<label/>', {
                            class: 'custom-control-label',
                            for: elementId,
                            text: element.name
                        })
                    )
                )
            );

        });
        return checkboxList;
    }

    function getJsonContent(path) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                dataType: "json",
                url: path,
                mimeType: "application/json",
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    }
});
