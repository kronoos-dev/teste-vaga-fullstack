import { Contract } from "@/types";

const goToPreviousPage = (currentPage: number, setCurrentPage: React.Dispatch<React.SetStateAction<number>>) => {
    if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }
};

const goToNextPage = (currentPage: number, setCurrentPage: React.Dispatch<React.SetStateAction<number>>) => {
    setCurrentPage(currentPage + 1);
};

const handleSearch = (event: React.ChangeEvent<HTMLInputElement>, setSearchTerm: React.Dispatch<React.SetStateAction<string>>) => {
    setSearchTerm(event.target.value);
};

const filterContracts = (allContracts: Contract[], searchTerm: string) => {
    return allContracts.filter(contract => {
        const searchData = Object.values(contract).join('').toLowerCase();
        return searchData.includes(searchTerm.toLowerCase());
    });
};

const toggleSortOrder = (sortOrder: 'asc' | 'desc', setSortOrder: React.Dispatch<React.SetStateAction<'asc' | 'desc'>>, allContracts: Contract[], setAllContracts: React.Dispatch<React.SetStateAction<Contract[]>>) => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    const sortedContracts = [...allContracts];
    sortedContracts.sort((a, b) => {
        if (sortOrder === 'asc') {
            return b.vlTotal - a.vlTotal;
        } else {
            return a.vlTotal - b.vlTotal;
        }
    });
    setAllContracts(sortedContracts);
};

export { goToPreviousPage, goToNextPage, handleSearch, filterContracts, toggleSortOrder };
