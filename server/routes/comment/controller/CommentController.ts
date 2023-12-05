import { Request, Response } from "express";
import { connect, model, Types } from "mongoose";
import { Comment, commentSchema } from "./CommentSchema";
import { getMapModel } from "../../map/controller/MapController";
/**
 * Connects to the mongodb server and returns a queriable object
 * @returns
 */
async function getCommentModel() {
    await connect(process.env.MONGO_DB_CONNECTION_STRING as string);
    return model("Comments", commentSchema);
}

/**
 * Gets list of comments based on the mapId
 * @param req request
 * @param res response
 * @returns a list of comments
 * @returns error status code
 */
export const getComments = async (req: Request, res: Response) => {
    const mapId = req.headers.id?.toString();
    const mapModel = await getMapModel();

    /* Get the user ID from the token (this is the user that is logged in) */
    const creator_id = req.session.user.id;

    /* Check if the map exists */
    const map = await mapModel.findById(mapId);
    if (!map) {
        return res.status(404).send("Error 404: Map not found");
    }

    /* Is this private map? If so can this user grab comments from this map? */
    if (!map.public) {
        // check if this map belongs to this user.
        if (map.creatorId.toString() !== creator_id) {
            return res
                .status(401)
                .send("Error 401: Unauthorized. Not your map to grab comments from.");
        }
    }

    const CommentModel = await getCommentModel();

    /* Get the comments for the map */
    const comments = await CommentModel.find({ mapId: mapId });

    /* Comments found */
    if (comments.length > 0) {
        return res.status(200).send(comments);
    }

    /* No comments found */
    return res.status(404).send("Error 404: No comments found for this map");
};

/**
 * Creates a comment
 * @param req request
 * @param res response
 * @returns positive status code
 * @returns error status code
 */
export const createComment = async (req: Request, res: Response) => {
    const mapId = req.body.mapId;
    const mapModel = await getMapModel();

    /* Get the user ID from the token (this is the user that is logged in) */
    const creator_id = req.session.user.id;

    /* Check if the map exists */
    const map = await mapModel.findById(mapId);
    if (!map) {
        return res.status(404).send("Error 404: Map not found");
    }

    /* Is this private map? If so can this user add comments to this map? */
    if (!map.public) {
        // check if this map belongs to this user.
        if (map.creatorId.toString() !== creator_id) {
            return res
                .status(401)
                .send("Error 401: Unauthorized. Not your map to add comments to.");
        }
    }

    const CommentModel = await getCommentModel();
    const commentObj = {
        commenterId: req.body.commenterId,
        displayName: req.body.displayName,
        mapId: req.body.mapId,
        content: req.body.content,
        creationDate: new Date(),
    };

    const comment = new CommentModel(commentObj);
    comment
        .save()
        .then(() => {
            res.status(200).send(comment);
        })
        .catch((err) => {
            res.status(400).send("unable to save comment due to " + err);
        });
}