// script.js

// Variáveis para controle de acessibilidade
const increaseFontButton = document.getElementById('increase-font');
const decreaseFontButton = document.getElementById('decrease-font');
const toggleContrastButton = document.getElementById('toggle-contrast');
const contrastColorPicker = document.getElementById('contrast-color-picker');
const body = document.body;
let currentFontSize = 16;
let isHighContrast = false;

// Modais de autenticação
const registerModal = document.getElementById('registerModal');
const loginModal = document.getElementById('loginModal');

// Formulários
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const petForm = document.getElementById('petForm');

// Elementos para listagem de pets
const petListDiv = document.getElementById('petList');

// Array para armazenar os pets cadastrados (simulação de banco de dados local)
let pets = [];

// Função para abrir o modal de registro
function openRegisterModal() {
    registerModal.style.display = 'block';
}

// Função para fechar o modal de registro
function closeRegisterModal() {
    registerModal.style.display = 'none';
}

// Função para abrir o modal de login
function openLoginModal() {
    loginModal.style.display = 'block';
}

// Função para fechar o modal de login
function closeLoginModal() {
    loginModal.style.display = 'none';
}

// Event listeners para os botões de acessibilidade
increaseFontButton.addEventListener('click', () => {
    currentFontSize += 2;
    body.style.fontSize = `${currentFontSize}px`;
});

decreaseFontButton.addEventListener('click', () => {
    if (currentFontSize > 12) {
        currentFontSize -= 2;
        body.style.fontSize = `${currentFontSize}px`;
    }
});

toggleContrastButton.addEventListener('click', () => {
    isHighContrast = !isHighContrast;
    body.classList.toggle('high-contrast-mode');
    // Esconde ou mostra o seletor de cor dependendo do modo de contraste
    contrastColorPicker.style.display = isHighContrast ? 'inline-block' : 'none';
});

contrastColorPicker.addEventListener('input', (event) => {
    if (isHighContrast) {
        body.style.backgroundColor = event.target.value;
        // Você pode adicionar lógica adicional para ajustar a cor do texto se necessário
    }
});

// Event listener para o envio do formulário de registro (simulação)
registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password === confirmPassword) {
        alert(`Usuário ${name} registrado com sucesso! (Simulação)`);
        closeRegisterModal();
        registerForm.reset();
    } else {
        alert('As senhas não coincidem.');
    }
});

// Função para simular o login
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    alert(`Tentativa de login com email: ${email} (Simulação)`);
    closeLoginModal();
    loginForm.reset();
}

// Função para adicionar um novo pet
function addPet() {
    const petName = document.getElementById('petName').value;
    const petFood = document.getElementById('petFood').value;
    const petImageInput = document.getElementById('petImage');
    const imagePreviewDiv = document.getElementById('imagePreview');
    let petImage = null;

    if (petImageInput.files && petImageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            petImage = e.target.result;
            savePet(petName, petFood, petImage);
        }
        reader.readAsDataURL(petImageInput.files[0]);
    } else {
        savePet(petName, petFood, petImage); // Salva sem imagem se nenhuma for selecionada
    }
}

// Função para salvar os dados do pet e atualizar a lista
function savePet(name, food, image) {
    const newPet = {
        name: name,
        food: food,
        image: image
    };
    pets.push(newPet);
    updatePetList();
    petForm.reset();
    document.getElementById('imagePreview').innerHTML = ''; // Limpa a prévia da imagem
}

// Função para atualizar a exibição da lista de pets
function updatePetList() {
    petListDiv.innerHTML = '<h2>Meus Pets</h2>';
    if (pets.length === 0) {
        petListDiv.innerHTML += '<p>Nenhum pet cadastrado ainda.</p>';
        return;
    }
    pets.forEach(pet => {
        const petItem = document.createElement('div');
        petItem.classList.add('pet-item');

        if (pet.image) {
            const img = document.createElement('img');
            img.src = pet.image;
            img.alt = pet.name;
            petItem.appendChild(img);
        }

        const petInfo = document.createElement('div');
        petInfo.classList.add('pet-info');
        const nameHeading = document.createElement('h4');
        nameHeading.textContent = pet.name;
        const foodParagraph = document.createElement('p');
        foodParagraph.textContent = `Ração preferida: ${pet.food || 'Não especificada'}`;
        petInfo.appendChild(nameHeading);
        petInfo.appendChild(foodParagraph);
        petItem.appendChild(petInfo);

        petListDiv.appendChild(petItem);
    });
}

// Event listener para pré-visualização da imagem do pet
document.getElementById('petImage').addEventListener('change', function() {
    const file = this.files[0];
    const imagePreviewDiv = document.getElementById('imagePreview');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreviewDiv.innerHTML = `<img src="${e.target.result}" alt="Prévia da imagem" style="max-width: 100px; max-height: 100px;">`;
        }
        reader.readAsDataURL(file);
    } else {
        imagePreviewDiv.innerHTML = '';
    }
});

// JavaScript para a funcionalidade de fixar a imagem no início
const escolherImagem = document.getElementById('escolherImagem');
const inicioImagem = document.getElementById('inicioImagem');
const arquivoSelecionadoSpan = document.getElementById('arquivoSelecionado');

// Carrega a imagem salva ao carregar a página
const imagemSalva = localStorage.getItem('inicioImagem');
if (imagemSalva) {
    inicioImagem.src = imagemSalva;
}

escolherImagem.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            inicioImagem.src = e.target.result;
            localStorage.setItem('inicioImagem', e.target.result); // Salva a imagem localmente
        }
        reader.readAsDataURL(file);
        arquivoSelecionadoSpan.textContent = file.name; // Exibe o nome do arquivo
    } else {
        arquivoSelecionadoSpan.textContent = ''; // Limpa o nome do arquivo se nada for selecionado
    }
});