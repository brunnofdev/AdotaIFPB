# Documentação de Requisitos - Sistema de Adoção IFPB

## 1. Breve Descrição do Projeto
O projeto consiste no desenvolvimento de um sistema voltado ao apoio e à organização do processo de adoção de animais abandonados no âmbito do Instituto Federal da Paraíba (IFPB).

A proposta surge da necessidade de estruturar e dar visibilidade a uma demanda recorrente dentro do ambiente acadêmico, onde animais em situação de abandono frequentemente dependem da iniciativa informal de alunos e servidores para encontrar um novo lar. A aplicação tem como principal objetivo centralizar informações, facilitar a comunicação entre interessados e promover maior transparência no processo de adoção, contribuindo para que ele ocorra de forma mais organizada, acessível e eficiente.

Ao reunir dados relevantes sobre os animais e os possíveis adotantes, o sistema busca reduzir a desinformação, evitar retrabalho e ampliar o alcance das iniciativas de adoção dentro da instituição. O sistema se posiciona como uma ferramenta de impacto social, alinhada aos valores de responsabilidade, cidadania e compromisso coletivo.

---

## 2. Requisitos Funcionais e Regras de Negócio

### RF01. Cadastrar Adotante
O sistema deve permitir que o Visitante realize seu cadastro inicial para tornar-se um adotante.
* **RN01:** O cadastro deve exigir, no mínimo, nome completo e um meio de contato válido (E-mail ou Telefone).
* **RN02:** O sistema deve impedir a duplicidade de cadastros através da validação única do E-mail.
* **RN03:** O usuário deve obrigatoriamente informar seu vínculo com o IFPB (Aluno, Servidor ou Terceirizado).

### RF02. Atualizar Cadastro
O sistema deve permitir que o Adotante altere seus dados pessoais e informações de contato.
* **RN01:** Apenas o próprio usuário autenticado pode editar suas informações.
* **RN02:** O campo de E-mail (identificador) não deve ser passível de alteração direta sem validação de segurança.

### RF03. Visualizar Animais Disponíveis
O sistema deve exibir a lista de animais aptos para um novo lar para todos os atores (Visitante, Adotante e Admin).
* **RN01:** Apenas animais com status "Disponível" devem ser exibidos nesta funcionalidade.
* **RN02:** A lista deve apresentar nome, espécie e descrição de forma clara para o interessado.
* **RN03:** A listagem deve ser atualizada automaticamente sempre que houver alterações no cadastro ou adoções.

### RF04. Cadastrar Animal
O sistema deve permitir que o Admin insira novos animais no catálogo do sistema.
* **RN01:** O cadastro deve conter obrigatoriamente: Nome, Espécie e Descrição.
* **RN02:** Todo novo animal cadastrado deve receber automaticamente o status inicial de "Disponível".

### RF05. Atualizar / Remover Animal
O sistema deve permitir que o Admin gerencie as informações dos animais ou os retire do sistema.
* **RN01:** Ao atualizar, o sistema deve manter a consistência dos dados obrigatórios.
* **RN02:** Não é permitido remover um animal que já possua um registro de adoção vinculado para não quebrar o histórico do sistema.

### RF06. Registrar Adoção
O sistema deve permitir que o Admin formalize o processo de entrega do animal ao novo dono.
* **RN01:** Um animal só pode ser vinculado a uma única adoção ativa.
* **RN02:** O sistema deve verificar se o animal está disponível antes de permitir o registro da adoção.
* **RN03:** Ao salvar o registro, o sistema deve alterar o status do animal de "Disponível" para "Adotado" imediatamente.
* **RN04:** O sistema deve gravar automaticamente a data e hora em que o registro de adoção foi realizado.

### RF07. Visualizar Adoções (Gerenciamento Administrativo)
O sistema deve permitir que usuários com perfil administrativo realizem o gerenciamento das informações cadastradas e acompanhem as adoções realizadas.
* **RN01:** Apenas usuários com permissão administrativa podem acessar funcionalidades de gerenciamento.
* **RN02:** O administrador deve poder visualizar todas as adoções registradas. O relatório deve exibir o vínculo completo: Nome do Adotante + Nome do Animal + Data da Adoção.
* **RN03:** O sistema deve manter consistência dos dados ao realizar alterações ou exclusões.
* **RN04:** Não deve ser permitido remover registros que comprometam o histórico de adoções.