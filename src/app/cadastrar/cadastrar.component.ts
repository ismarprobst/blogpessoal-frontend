import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

user: User = new User
confirmarSenha: string
tipoUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router  // para fazermos o redirecionamento de rota pelo TS
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  tipoUser(event:any){
    this.tipoUsuario = event.target.value
  }
// Criams o metoodo cadastrar agora, para ocorrer quando clica no botao
  cadastrar() {
    this.user.tipo = this.tipoUsuario

    if (this.user.senha != this.confirmarSenha){
      alert('As senhas não coincidem! Insira novamente.')
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: User)=> //é chamado o cadastrar de authService. Ja o subscribe funciona convertendo a nossa resposta de objeto para JSON, que é como inserimos os dados no post.
      {this.user = resp
      this.router.navigate(['/entrar']) // redireciona para o entrar
      alert('Usuário cadastrado com sucesso!')
    
    })
    }
  }

}
