
class TreeNode {
    public left: TreeNode | null = null;
    public right: TreeNode | null = null;
    public parent: TreeNode | null = null;
    public data: number;

    constructor (data: number) {
        this.data = data;
    }
}

class BinSearchTree {
    public rootNode: TreeNode | null = null;

    insertNode (node: TreeNode) {
        if (this.rootNode === null) {
            this.rootNode = node;
        } else {
            this.insertNodeDeep(this.rootNode, node);
        }

        return node;
    }

    insertNodeDeep (root: TreeNode, node: TreeNode) {
        if (root.data > node.data) {
            if (root.left === null) {
                node.parent = root;
                root.left = node;
            } else {
                this.insertNodeDeep(root.left, node);
            }
        } else {
            if (root.right === null) {
                node.parent = root;
                root.right = node;
            } else {
                this.insertNodeDeep(root.right, node);
            }
        }
    }

    size (root = this.rootNode) {
        let maxLevel = 0;

        const sizeInner = (treeNode: TreeNode, level = 0) => {
            if (treeNode === undefined || treeNode === null) {
                return;
            }

            if (maxLevel < level) {
                maxLevel = level;
            }

            sizeInner(treeNode.left, level + 1);
            sizeInner(treeNode.right, level + 1);
        }

        sizeInner(root);

        return maxLevel;
    }
}
