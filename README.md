# FancyTodo

"axios": "^0.21.0",
    "bcrypt": "^5.0.0",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "google-auth-library": "^6.1.3",
    "googleapis": "^62.0.0",
    "jsonwebtoken": "^8.5.1",
    "live-server": "^1.2.1",
    "pg": "^8.4.1",
    "sequelize": "^6.3.5",
    "sequelize-cli": "^6.2.0"
  }
}

 <!-- view all Todos -->
    <section id="allTodos">
        <div class = "justify-content-center">
        <div class="container" id="news" style="background: #B5C6B9; opacity: 0.5; border-radius: 8px; box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.65); height: fit-content; width: auto; margin: 1rem auto 2rem auto;">
        </div>
        <h3 class="text-center text-dark font-weight-bold">TO-DO LIST</h3>
        <div class="container" >
            <div class ="row my-5">
                <div class ="col-md-4 " id="formadd">
                    <div class="card">
                        <div class="card-body">
                            <form onsubmit ="addTodo(event)" id="form-task">
                                <div class ="form-group" id="formadd">
                                    <input type="text" id="title-todo" class ="form-control" maxlength ="50" autocomplete="off" placeholder="Title" required>
                                </div>
                                <div class ="form-group">
                                    <textarea type="text" id="description-todo" cols="30" rows ="5" class ="form-control" maxlength ="500" autocomplete="off" placeholder="Description" required></textarea>
                                </div>
                                <div class ="form-group">
                                    <input type="text" id="status-todo" class ="form-control" maxlength ="50" autocomplete="off" placeholder="Status" required>
                                </div>
                                <div class ="form-group">
                                    <input type="text" id="date-todo" class ="form-control" maxlength ="500" autocomplete="off" placeholder="date" required>
                                </div>
                                <button type="submit" class="btn btn-success btn-block">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
                
                    <div class ="row " id = "hasiltodo";">
                    </div>
                </div>
            </div>
        </div>        
          <div id="todos" style="margin-left: 95px;">
          </div>
        </div>
    </section>