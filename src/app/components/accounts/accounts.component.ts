import { Component, OnInit } from '@angular/core';
import { ClientMessage } from 'src/app/models/client-message';
import { User } from 'src/app/models/user';
import { AccountsService } from 'src/app/services/accounts.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  title = 'Backend Info'
  public users: User[] = [];
  public user = new User(0, 0, '', '');
  public clientMessage = new ClientMessage('');

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.findAll();
  }

  public findAll() {
    
  //   this.userService.getAll()
  //     .subscribe(data => this.users = data)
  // }

  // public insert() {

  //   this.userService.save(this.user)
  //     .subscribe(
  //       data => this.clientMessage.message = `Successfully registered ${data.username}`,
  //       error => this.clientMessage.message = `Something went wrong. Error: ${error}`
  //     )
  // }
    

// }
  
  }
}
