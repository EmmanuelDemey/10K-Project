document.querySelector('form').addEventListener('submit', function(e){
    if(window.fetch){
        e.preventDefault();
        e.stopPropagation();
        
        var headers = new Headers();
        headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        fetch('attributes.php', {
            method: 'POST',
            headers: headers,
            body: 'element=' + document.getElementById('element').value
        })
        .then(function(response){
            response.text().then(function(data) {  
                document.querySelector('form').insertAdjacentHTML( 'afterend',data);  
            });  
            
        });
    }
});