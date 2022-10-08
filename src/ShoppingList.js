import './App.css';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function ShoppingList(){
    const [checked, setChecked] = React.useState([0]);
    const [items, setItems] = React.useState([]);
    const [doneList, setDoneList] = React.useState([])
    const [inputValue, setInputValue] = React.useState("");
    const [filterCompleted, setFilterCompleted] = React.useState(0)
    const [selectedItem, setSelectedItem] = React.useState("")

    //Function for delete an item
    const handleToggle = (value) => () => {
        var itemsList = [...items];    
        //filtering the item list
        setItems(itemsList.filter(function(item) { 
            console.log(item.itemName)
            return item.itemName !== value 
        }));
    };

    //Function for update the Done List (should call handleToggle)
    const handleDoneList  = (value) => () => {
        setDoneList(doneList => [...doneList, value])
        var itemsList = [...items];
        setItems(itemsList.filter(function(item) { 
            console.log(item.itemName)
            return item.itemName !== value 
        }));
    };

    //Add an item
    const handleAddButtonClick = () => {
        var alreadyInserted = false
        items.forEach(item => {
            if(item.itemName === inputValue)
                alreadyInserted = true
        });

        if(!alreadyInserted && inputValue !== ""){
            const newItem = {
                itemName: inputValue,
                quantity: 1,
                isCompleted: false,
            };
            const newItems = [...items, newItem];
            setItems(newItems);
            setInputValue('');
        }else{
            alert("Fill correctly the field")
        }
    };

    //Show only Done list
    const handleCompleted = () => {
        if(!filterCompleted)
            setFilterCompleted(1)
        else
            setFilterCompleted(0)
    }

    //Struct for filtering the items
    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: (option) => filterCompleted? option : option.itemName,
    });

    return(
        <div className="container">
            <div className='row'>
                <div className='column'>
                <h2>Insert here the items</h2>
                    <Stack direction="row" alignItems="center" spacing={1} style={{paddingLeft:"15vw"}}>
                        <TextField id="outlined-basic" label="Add an item" variant="outlined" value={inputValue} onChange={(event) => setInputValue(event.target.value)}></TextField>
                        <Button size="large" variant="contained" onClick={handleAddButtonClick}><AddIcon></AddIcon></Button>
                    </Stack> 
                </div>
                <div className='column'>
                <h2>Filter your shopping list</h2>
                    <FormGroup>
                        <Stack direction="row" alignItems="center" spacing={1} style={{paddingLeft:"10vw"}}>
                            <Autocomplete
                                id="filterItems"
                                options={filterCompleted ? doneList : items}
                                onChange={(event, newValue) => {
                                    console.log(newValue)
                                    setSelectedItem(newValue);
                                }}
                                getOptionLabel={(option) => filterCompleted ? option : option.itemName}
                                filterOptions={filterOptions}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Custom filter" />}
                            />
                            <FormControlLabel control={<Checkbox checked={filterCompleted} onClick={handleCompleted} defaultChecked />} label="Show completed items" />
                        </Stack>
                    </FormGroup>
                </div>
            </div>
            <div className='row'>
                <div className="column" style={{visibility: filterCompleted ? "hidden" : "visible"}}>
                    <h2>To Buy List</h2>
                    <List sx={{ width: '100%', maxWidth: 360 }} >
                        {items.filter(function(item) {
                            if(selectedItem && !filterCompleted)
                                return item.itemName === selectedItem.itemName 
                            else
                                return item.itemName
                        }).map((item, index) => (
                            <div id={item.name} style={{padding: "10px"}}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <ListItem
                                        key={item.itemName}
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="comments"></IconButton>
                                        }
                                        disablePadding
                                    >
                                        <ListItemButton role={undefined} onClick={handleDoneList(item.itemName)}>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked.indexOf(item.itemName) !== -1}
                                                    tabIndex={-1}
                                                    inputProps={{ 'aria-labelledby': item.itemName }}
                                                />
                                            </ListItemIcon>
                                        </ListItemButton>
                                        <TextField
                                            id={item.itemName}
                                            defaultValue={item.itemName}
                                            label="Item name"
                                            onChange={(event) => {
                                                if(event.target.value === ""){
                                                    alert("Item cannot be null");
                                                    event.target.value = item.itemName
                                                }
                                                var alreadyInserted = false; 
                                                items.forEach(item => {
                                                    if(item.itemName === event.target.value)
                                                        alreadyInserted = true;
                                                });
                                                if(!alreadyInserted)
                                                    item.itemName = event.target.value;
                                                else {
                                                    alert("Item already inserted");
                                                    event.target.value = item.itemName
                                                }    
                                            }}
                                        />                
                                    </ListItem>                
                                    <TextField
                                        id="outlined-number"
                                        label="Num"
                                        type="number"
                                        defaultValue={item.quantity}
                                        onChange={(event) => item.quantity = event.target.value}
                                        InputProps={{ inputProps: { min: 1, max: 20 } }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <IconButton aria-label="delete" size="small" onClick={handleToggle(item.itemName)}>
                                        <DeleteIcon></DeleteIcon>
                                    </IconButton>
                                </Stack>
                            </div>
                        ))}
                    </List>
                </div>
                <div className="column">
                    <h2>Done List</h2>
                    <List sx={{ width: '100%', maxWidth: 360 }}>
                        {doneList.filter(function(item) {
                            if(selectedItem && filterCompleted){
                                console.log(selectedItem)
                                return item === selectedItem
                            }else
                                return item
                        }).map((item, index) => (
                            <div id={item}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <ListItem
                                        secondaryAction={<IconButton edge="end" aria-label="comments"></IconButton>}
                                        disablePadding
                                    >
                                        <ListItemButton role={undefined}>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    tabIndex={-1}
                                                    checked
                                                    disabled
                                                    inputProps={{ 'aria-labelledby': item }}
                                                />
                                            </ListItemIcon>
                                        </ListItemButton>
                                        <ListItemText primary={item} />               
                                    </ListItem>                
                                </Stack>
                            </div>
                        ))}
                    </List>
                </div>
            </div>
        </div>
    );
}

export default ShoppingList;