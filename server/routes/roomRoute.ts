//all routes for room like room

import { Router } from 'express';
import { getRooms, 
    getRoomById, 
    createRoom, 
    updateRoomById, 
    deleteRoomById } from '../controller/roomController';

const router = Router();

router.route('/rooms').get( getRooms)
router.route("/room").post(createRoom);
router.route('/rooms/:id').get(getRoomById)
                          .put(updateRoomById)
                          .delete(deleteRoomById);
export default router;