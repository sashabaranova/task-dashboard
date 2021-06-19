import React, { useState } from 'react';
import { v4 } from 'uuid'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MyCard from '../MyCard';
import MyCardCreate from '../MyCardCreate';

import styles from './index.module.scss';
import mockData from '../../data';

const getItems = status => {
  return mockData.tasks.filter(task => task.status === status);
};

const Home = () => {
  // State
  const [tasks, setTasks] = useState({
    'new': getItems('new'),
    'active': getItems('active'),
    'completed': getItems('completed')
  });

  const [isOpen, setIsOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [startIndex, setStartIndex] = useState('');

  const getColumnTitle = status => {
    switch (status) {
      case 'new':
        return 'To Do'
      case 'active':
        return 'In Progress'
      case 'completed':
        return 'Finished'
      default:
        return ''
    }
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    console.log(result)

    return result;
  };


  const onOpenNewCard = () => {
    setIsOpen(true)
  };

  const onCloseNewCard = () => {
    setIsOpen(false);
    setNewDesc('');
    setNewTitle('');
  };

  const onChangeDesc = e => {
    e.preventDefault();
    console.log(e.target.value)
    setNewDesc(e.target.value);
  };

  const onChangeTitle = e => {
    e.preventDefault();
    console.log(e.target.value)
    setNewTitle(e.target.value);
  };

  const onAddNewCard = ({ title, desc }) => {
    setTasks({
      ...tasks,
      'new': [...tasks.new, { title, desc, status: 'new', id: v4() }]
    })
  };

  const onDragStart = start => {
    const startIndex = mockData.columnOrder.indexOf(start.source.droppableId)
    console.log('startIndex', startIndex);
    setStartIndex(startIndex);
  };

  const onDragEnd = result => {
    console.log(result)
    const { source, destination } = result;

    console.log(source, destination);

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        tasks[source.droppableId],
        source.index,
        destination.index
      );

      setTasks({
        ...tasks,
        [source.droppableId]: items,
      })
    } else {
      const result = move(
        tasks[source.droppableId],
        tasks[destination.droppableId],
        source,
        destination
      );

      setTasks({
        ...tasks,
        [source.droppableId]: result[source.droppableId],
        [destination.droppableId]: result[destination.droppableId],
      })
    }
  };

  return (
    <div className={styles.homeContent}>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        {mockData.columnOrder.map((col, index) => (
          <div key={col} className={styles.column}>
            <div className={styles.column__internal}>
              <Typography classes={{ root: styles.typo }} component="h4" variant="h4">
                {getColumnTitle(col)}
              </Typography>
              <Droppable droppableId={col} isDropDisabled={index === startIndex + 2 || startIndex === 2}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={styles.listStyle}
                  >
                    {tasks[col].map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={styles.itemStyle}
                          >
                            <MyCard {...item} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {col === 'new' && isOpen && (
                      <MyCardCreate
                        onCreate={onAddNewCard}
                        onOpen={onOpenNewCard}
                        onClose={onCloseNewCard}
                        title={newTitle}
                        desc={newDesc}
                        onChangeDesc={onChangeDesc}
                        onChangeTitle={onChangeTitle}
                      />)}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              {col === 'new' && !isOpen && (
                <Button
                classes={{ root: styles.textBtn }}
                onClick={onOpenNewCard}
                variant="text">+ Add new task</Button>
              )}
            </div>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default Home;