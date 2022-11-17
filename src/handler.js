const notes = require('./notes');
const {nanoid} = require('nanoid');

const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const note = notes.filter((n)=> n.id === id)[0];

    if (note !== undefined) {
        return {
          status: 'success',
          data: {
            note,
          },
        };
      }

      const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
      });
      response.code(404);
      return response;
  };
const getAllNotesHandler = () => ({
    status: 'success',
    data: {
      notes,
    },
  });

const addNoteHandler = (request, h) => {
    const {title, tags, body} = request.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updateAt = createdAt;

   

const newNote = {
    title, tags, body, id, createdAt, updateAt,
};
notes.push(newNote);

const isSuccess = notes.filter((note)=> note.id === id).length > 0;
if (isSuccess){
    const response = h.response({
        status : 'success nih',
        message : 'Catatan berhasil di tambahkan',
        data:{
            noteId : id,
        },
    });
    response.code(201);
    return response;
}

const response = h.response({
    status: 'fail',
    message : 'Catatan gagal ditambahakan',
});
response.code(500);
return response;
};

const editNoteByIdHandler = (request, h)=>{
const{id} = request.params;

const {title, tags, body} = request.payload;
const updateAt = new Date().toISOString();

const index = notes.findIndex((note)=>note.id ===id);
if (index !== -1){
    notes[index] = {
        ...notes[index],
        title,
        tags,
        body,
        updateAt,
    };
    const response = h.response({
        status : 'Success',
        message : 'Catatan berhasil di update',
    });
    response.code(200);
    return response;
    }
    const response = h.response({
        status : 'fail',
        message : 'Gagal memperbaharui catatan',
    });
    response.code(404);
    return response;
};

const deleteNoteByIdHandler = (request, h)=>{
    const {id} = request.params;

    const index = notes.findIndex((note)=>note.id === id);
    if(index!==-1){
        notes.splice(index,1);
        const response = h.response({
            status : 'success',
            message : 'Catatan dihapus',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status : 'Gagal',
        message : 'Catata tidak terhapus',
    });
    response.code(404);
    return response;
};
module.exports = {addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler};
