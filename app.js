const app = Vue.createApp({
	// data, functions

	data(){
		return {
			todos:[]
		} 
	},
	mounted(){
		this.getTodo()
	},
	methods: {
		getTodo(){
			fetch("http://127.0.0.1:8000/retrieve-and-create-todos")
				.then(res => res.json())
				.then(data => this.todos = data["data"])
				.catch(err => console.log(err.message))
		},
		postFunctionTodo(body){
			const headers = {
				"Content-Type": "application/json",
				"Accept": "application/json",
			};
			fetch("http://127.0.0.1:8000/retrieve-and-create-todos", {
				    method: "POST",
				    headers,
				    body: JSON.stringify(body),
				})
				.then(response => response.json())
				.then(this.getTodo())
				.then(this.getTodo())
		},
		createTodo(){
			var getbody = document.querySelector("#todo-input").value
			if(!getbody){
				alert("Please enter your todo")
			}else{
				let body = {
				    "body": getbody,
				}
				// sending
				this.postFunctionTodo(body)

				
			}
		},
		deleteTodo(todo_id){
			fetch("http://127.0.0.1:8000/delete-todo/"+todo_id, {
				    method: "DELETE",
				})
				.then(response => response.json())
				.then(this.getTodo())
				.then(this.getTodo())
		},
		changeTitle(title){
			// this.title = "words of Randiance"
			this.title  = title
		},
		toggleShowBooks(){
			this.showBook = !this.showBook
		}
	},
	
})

app.mount("#app")




// template: '<h2>I am the template </h2>'