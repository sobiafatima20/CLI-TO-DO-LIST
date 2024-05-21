#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todos = [];
let condition = true;
//make todolist
let todoList = await inquirer.prompt([
    {
        name: "list",
        type: "confirm",
        message: chalk.green("Do you want to?"),
    }
]);
if (todoList.list) {
    while (condition) {
        let perform = await inquirer.prompt([
            {
                name: "Task",
                type: "list",
                choices: ["Add", "Delete", "Update", "View", "Exit"],
                message: chalk.cyan("Please Select Option"),
                default: "true"
            }
        ]);
        //add list to  todolist    
        if (perform.Task === "Add") {
            let addTask = await inquirer.prompt([
                {
                    name: "task",
                    type: "input",
                    message: chalk.green("What you want add in your Todos list?"),
                },
                {
                    name: "addMore",
                    type: "confirm",
                    message: chalk.green("Do you want to add more"),
                    default: "false",
                }
            ]);
            todos.push(addTask.task);
            condition = perform.Task;
            console.log(chalk.greenBright(todos));
        }
        //Delete the list of todolist
        else if (perform.Task === "Delete") {
            let deleteTask;
            do {
                deleteTask = await inquirer.prompt([
                    {
                        name: "delete",
                        type: "number",
                        message: chalk.green("Enter the index of the task you want to delete:"),
                    },
                    {
                        name: "deleteMore",
                        type: "confirm",
                        message: chalk.green("Do you want to delete more?"),
                        default: false,
                    }
                ]);
                if (deleteTask.delete >= 0 && deleteTask.delete < todos.length) {
                    todos.splice(deleteTask.delete, 1);
                }
                else {
                    console.log(chalk.red("Invalid index"));
                }
                console.log(chalk.greenBright(todos));
            } while (deleteTask.deleteMore);
        }
        //update the list of todolist
        else if (perform.Task === "Update") {
            let updateTask;
            do {
                updateTask = await inquirer.prompt([
                    {
                        name: "index",
                        type: "number",
                        message: chalk.green("Enter the index of the task you want to update:"),
                    },
                    {
                        name: "newTask",
                        type: "input",
                        message: chalk.green("Enter the new task:"),
                    },
                    {
                        name: "updateMore",
                        type: "confirm",
                        message: chalk.green("Do you want to update more?"),
                        default: false,
                    }
                ]);
                if (updateTask.index >= 0 && updateTask.index < todos.length) {
                    todos[updateTask.index] = updateTask.newTask;
                }
                else {
                    console.log(chalk.red("Invalid index"));
                }
                console.log(chalk.greenBright(todos));
            } while (updateTask.updateMore);
        }
        //View the list of todolist
        else if (perform.Task === "View") {
            console.log(chalk.greenBright("Your todo list:"));
            todos.forEach((task, index) => {
                console.log(chalk.blue(`${index}: ${task}`));
            });
        }
        //Exit the list of todolist
        else if (perform.Task === "Exit") {
            console.log(chalk.green("Thanks to use this todo list!"));
            condition = false;
        }
    }
}
