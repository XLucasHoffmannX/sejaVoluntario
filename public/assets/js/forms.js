const validateField = (field, message)=>{
    if(!field.value && field.value.trim() == ""){ 
        alert(message);
        return false;
    }
    return true
}

const validateNotice = (form)=>{
    return validateField(form.email, "Email deve ser informado!")  && validateField(form.description, 'Descrição deve ser informado !') && validateField(form.titulo, 'Titulo deve ser informado !') && validateField(form.cidade, 'A cidade deve ser informada !'); 
}

const validateSearch = (form)=>{return validateField(form.key, 'Informe o que deseja buscar!')}