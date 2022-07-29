import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../services/mongodb";
import { ExtendedAuthRequest } from "../../types";
import { handleResponse } from "../../util/response";

class DeleteFeedController {
  async handle(req: ExtendedAuthRequest, res: Response) {
    try{
      const { id: feedId } = req.params;

      const db = await connectToDatabase();
      const collection = db.collection("feeds");
  
      const { id } = req;
  
      const feeds = await collection.findOne({ _id: new ObjectId(feedId) });
  
      if (feeds.userId.toString() !== id) {
        return handleResponse(res, 401, 'Not authorized');
      }
  
      await collection.deleteOne({ _id: new ObjectId(feedId) });
  
      return res.status(200).json({ message: "Feed deletado com sucesso" });
    }catch{
      return handleResponse(res, 500, 'Internal Server Error');
    }
   
  }
}

export const deleteFeedController = new DeleteFeedController();