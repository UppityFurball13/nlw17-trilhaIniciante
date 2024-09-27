const { select, input, checkbox } = require('@inquirer/prompts');

let meta = {
  value: "Tomar 3L de água por dia",
  checked: false
}

let metas = [meta]

const cadastrarMeta = async () => {
  const meta = await input({ message: "Digite a meta:" })
  if (meta.lenght == 0) {
    console.log("A meta não pode ser vazia.")
    return
  }
  metas.push({ value: meta, checked: false })
}

const listarMeta = async () => {
  const respostas = await checkbox({
    message: "Use as setas para mudar de metas, o espaço para marcar ou desmarcar e o enter para finalizar essa etapa.",
    choices: [...metas],
    instructions: false
  })
  metas.forEach((m) => {
    m.checked = false
  })
  if(respostas.length == 0) {
    console.log("Nenhum meta selecionada!")
    return
  }

  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta
    })
    meta.checked = true
  })
  console.log("Meta(s) marcadas como concluída(s)")
}

const metasRealizadas = async () => {
  const realizadas = metas.filter((meta) => {
    return meta.checked
  })
  if(realizadas.lenght == 0){
    console.log("Nenhuma meta realizada!")
    return
  }
  await select({
    message: "Metas realizadas " + realizadas.length,
    choices: [...realizadas]
  })
}

const metasAbertas = async () => {
  const abertas = metas.filter((meta) => {
    return meta.checked != true
  })
  if(abertas.length == 0){
    console.log("Não existe metas abertas! :")
    return
  }
  await select({
    message: "Metas abertas " + abertas.length,
    choices: [...abertas]
  })
}

const start = async () => {
  while (true) {
    const opcao = await select({
      message: "Menu >",
      choices: [
        {
        name: "Cadastrar meta",
        value: "cadastrar"
        },
        {
          name: "Listar metas",
          value: "listar"
        },
        {
          name: "Metas Abertas",
          value: "abertas"
        },
        {
          name: "Metas realizadas",
          value: "realizadas"
        },
        {
          name: "Sair",
          value: "sair"
        }
      ]
    })
    switch (opcao) {
      case "cadastrar":
        await cadastrarMeta()
        console.log(metas)
        break
      case "listar":
        await listarMeta()
        console.log(metas)
        break
      case "realizadas":
        await metasRealizadas()
        break
      case "abertas":
        await metasAbertas()
        break
      case "sair":
        console.log("Saindo...")
        return
     }
   }
}
 
start()