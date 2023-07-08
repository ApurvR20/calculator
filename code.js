//make so only single zero integr (0) can be typed
//keyboard input



//calculation logic
const calc = (op,num1,num2) => {
    let res = 0;
    console.log(`i=${i} j=${j} op=${op}`);
    num1 = parseFloat(num1);
    num2  = parseFloat(num2);
    if(op == "+")
    res = num1+num2;
    else if(op == '-')
    res = num1-num2;
    else if(op == 'X')
    res = num1*num2;
    else if(op == '/'){
        if(num2 == 0)
        {
            window.alert("Division by Zero Error");
            return "ERROR";
        }
        else res = num1/num2;
    }
    else{
        window.alert("Invalid operator. Retry");
        return "ERROR";
    }
    console.log(res);
    if(Number.isInteger(res))
    res = res.toFixed(0);
    else res = res.toFixed(2);

    if(res.includes('.') && res.charAt(res.length - 1) == '0')
    res = res.substring(0, res.length - 1);

    return res;
}


const lower_screen = document.querySelector('#lower');
const upper_screen = document.querySelector('#upper');
let res 
let i='0',j='',op = '', dec_i = false, dec_j = false;

//displaying text on screen
const screen = () => {
    if(j != "")
    {
        lower_screen.textContent = j;
        upper_screen.textContent = i+" "+op;
    }
    else if(op != '')
    {
        lower_screen.textContent = '';
        upper_screen.textContent = i+" "+op;
    }
    else{
    lower_screen.textContent = i;
    upper_screen.textContent = '';
}}
screen();

//event listener for numbers (0-9)
const numbers = document.querySelectorAll('.number');
numbers.forEach(number => number.addEventListener('click', () => {
    if(op == '' && i.length < 11 )
    {
        if(i === '0')
        i = number.textContent;
        else i+=number.textContent;
    }
    else if(op!='' && j.length < 11) j+=number.textContent;
    screen();
}));

//event listener for decimal (.)
const decimal = document.querySelector('.decimal');
decimal.addEventListener('click',
() =>{
if(op == '' && !dec_i)
{
    i+='.';
    dec_i = true;
}
else if(op!='' && !dec_j)
{
    if(j == '') j+='0';
    j+='.';
    dec_j = true;
}


screen();
});

//event listener for operators (+,-,*,/,=)
const operators = document.querySelectorAll('.operator');
operators.forEach(operator => operator.addEventListener('click', ()=>{


    if (j!='')
    {
        res = calc(op,i,j);
        if(res !='ERROR')
        {
            j = '';
            i = res;
            dec_i = i.includes('.');
            dec_j = false;
            res = '';
            if(operator.textContent!= '=')
            op = operator.textContent;
            else op = '';
        }
        else if(j == 0) j = '';
    }
    else if(operator.textContent == '='){
        op = '';
        if(i == 0)
        {
            i = 0;
            dec_i = false;
        }
    }
    else if(op == '') op = operator.textContent;


    
    screen();
}))

//event listener for all clear
const ac = document.querySelector('#all_clear');
ac.addEventListener('click', ()=>{
    i = '0';
    j = '';
    op = '';
    res = '';
    dec_i = dec_j = false;
    
    screen();
});

//event listener for delete
const cl = document.querySelector('#delete');
cl.addEventListener('click', ()=> {

    if(j !== "")
    {
        j = j.slice(0,-1);
    }
    else if(op!== "")
    {
        op = "";
    }
    else if(i.length>1)
    {
        i = i.substring(0,i.length - 1);
    }
    else{
        i = '0';
        dec_i = false;
    }

    
    screen();
});



