
//剑指 Offer 32 - II. 从上到下打印二叉树 II
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */


function levelOrder(root: TreeNode | null): number[][] {
    const printArr: number[][] = [];
    if(!root) return printArr;
    let levelQue = [root];
    while (levelQue.length) {
        let levelVal = [];
        let qLen = levelQue.length;
        for(let i = 0; i < qLen; i++) {
            let currentNode = levelQue[i];
            levelVal.push(currentNode.val);
            if (currentNode.left) levelQue.push(currentNode.left);
            if (currentNode.right) levelQue.push(currentNode.right);
        }
        printArr.push(levelVal);
        levelQue = levelQue.splice(qLen); 
    }
    return printArr;
};
