import {fireEvent, render,screen, waitFor} from '@testing-library/react'
import Login from './Login'
jest.mock("axios", ()=>({
    __esModule:true,
    default:{
        get:()=>({
            data:{id:1, name:'john'}
        })
    }
}))


test('username input should be rendered', ()=>{
    render(<Login/>);
    const username = screen.getByPlaceholderText(/username/i);
    expect(username).toBeInTheDocument()
})

test('Password input should be rendered', ()=>{
    render(<Login/>);
    const password = screen.getByPlaceholderText(/password/i);
    expect(password).toBeInTheDocument()
})

test('button input should be rendered', ()=>{
    render(<Login/>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument()
})

test('username input should be empty', ()=>{
    render(<Login/>);
    const username = screen.getByPlaceholderText(/username/i);
    expect(username.value).toBe('')
})
test('password input should be empty', ()=>{
    render(<Login/>);
    const password = screen.getByPlaceholderText(/password/i);
    expect(password.value).toBe('')
})

test('button input should be disabled', ()=>{
    render(<Login/>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled()
})

test('error message should be invisible', ()=>{
    render(<Login/>);
    const error = screen.getByTestId('error');
    expect(error).not.toBeVisible()
})

test('username input should change', ()=>{
    render(<Login/>);
    const usernameinput = screen.getByPlaceholderText(/username/i);
    const testVal = "test"

    fireEvent.change(usernameinput, {target:{value:testVal}})
    expect(usernameinput.value).toBe(testVal)
})
test('password input should change', ()=>{
    render(<Login/>);
    const password = screen.getByPlaceholderText(/password/i);
    const testVal = "test"

    fireEvent.change(password, {target:{value:testVal}})
    expect(password.value).toBe(testVal)
})

test('button input should not be disabled when input exists', ()=>{
    render(<Login/>);
    const button = screen.getByRole('button');
    const usernameinput = screen.getByPlaceholderText(/username/i);
    const password = screen.getByPlaceholderText(/password/i);
    const testVal = "test"


    fireEvent.change(usernameinput, {target:{value:testVal}})
    fireEvent.change(password, {target:{value:testVal}})
    expect(button).not.toBeDisabled()
})

test('loading should be rendered when login is clicked', ()=>{
    render(<Login/>);
    const button = screen.getByRole('button');
    const usernameinput = screen.getByPlaceholderText(/username/i);
    const password = screen.getByPlaceholderText(/password/i);
    const testVal = "test"


    fireEvent.change(usernameinput, {target:{value:testVal}})
    fireEvent.change(password, {target:{value:testVal}})
    fireEvent.click(button);
    expect(button).toHaveTextContent(/please wait.../i)
})

test('loading should not be rendered after fetching', async()=>{
    render(<Login/>);
    const button = screen.getByRole('button');
    const usernameinput = screen.getByPlaceholderText(/username/i);
    const password = screen.getByPlaceholderText(/password/i);
    const testVal = "test"


    fireEvent.change(usernameinput, {target:{value:testVal}})
    fireEvent.change(password, {target:{value:testVal}})
    fireEvent.click(button);
    await waitFor(()=>
    expect(button).not.toHaveTextContent(/please wait.../i))
})

test('user should not be rendered after fetching', async()=>{
    render(<Login/>);
    const button = screen.getByRole('button');
    const usernameinput = screen.getByPlaceholderText(/username/i);
    const password = screen.getByPlaceholderText(/password/i);
    const testVal = "test"

    fireEvent.change(usernameinput, {target:{value:testVal}})
    fireEvent.change(password, {target:{value:testVal}})
    fireEvent.click(button);
    const user = await screen.findByText('john')
    expect(user).toBeInTheDocument()
})