'use client';
import {socket} from '@/lib/socket.io';
import {useEffect} from 'react';
import {NoteEvent} from '../note.event';
import {RevalidateNote} from '../action';

const NoteRealTime = () => {
  useEffect(() => {
    socket.on(NoteEvent.ADD, data => {
      console.log(data);
      RevalidateNote();
    });
    socket.on(NoteEvent.EDIT, data => {
      console.log(data);
      RevalidateNote();
    });
    socket.on(NoteEvent.DELETE, data => {
      console.log(data);
      RevalidateNote();
    });
  }, []);
  return null;
};

export default NoteRealTime;
