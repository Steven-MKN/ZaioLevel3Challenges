$(document).ready(() => {

    $("#submit-button").click( () => {
        
        let inputs = [
            document.querySelector('#inpName').value,
            document.querySelector('#inpSurname').value,
            document.querySelector('#inpAge').value,
            document.querySelector('#inpEmail').value,
            document.querySelector('#inpPassword').value,
            document.querySelector('#inpConfPassword').value
        ];

        if (inputs.includes('')) {
            alert('Please complete all fields');
            return;
        }

        let data = {
            inpName: inputs[0],
            inpSurname: inputs[1],
            inpAge: inputs[2],
            inpEmail: inputs[3],
            inpPassword: inputs[4],
            inpConfPassword: inputs[5]
        };

        $.post('/register/submit', data, (dataRes) => {
            alert(dataRes.message);
            if (dataRes.code == 201) 
                    window.location = '/login';
        });
    });
});
