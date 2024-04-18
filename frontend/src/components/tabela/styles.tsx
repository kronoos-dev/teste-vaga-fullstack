import styled from 'styled-components';

export const StyledTable = styled.div`
    width: 90%;
    margin-top: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow-x: auto; 
`;

export const TableWrapper = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const Th = styled.th`
    padding: 10px;
    text-align: center; 
    background-color: #28075389;
    color: white; 
    font-size: 15px;
`;

export const Tr = styled.tr`
    cursor: pointer;
    background-color: white; 
    transition: background-color 0.3s; 
    
    &:hover {
        color: white;
        background-color: #000000; 
    }
`;

export const Td = styled.td`
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    text-align: center; 
    border-bottom: 1px solid #000;
`;

export const Button = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 20px;
    padding: 8px;
    transition: color 0.3s ease;

    &:hover {
        color: white;
    }
`;

export const ButtonDiv = styled.div`
    display: flex;
    padding: 15px;
`;

export const Content = styled.div`
    margin-left: 50px;

    h2 {
        margin-bottom: 5px;
    }
`;

export const Input = styled.input`
    padding: 10px;
    margin-bottom: 10px;
    background-color: transparent;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    color: #fff;
    transition: border-color 0.3s ease;

    &:focus {
        outline: none;
        border-color: #280753;
    }
`;
