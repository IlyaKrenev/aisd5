class Queue {
    constructor() {
        this.arr = [];
        this.arr = [];
    }
    enqueue(value) {
        this.arr.push(value);
    }
    dequeue() {
        return this.arr.shift();
    }
    isEmpty() {
        return this.arr.length == 0;
    }
}
class InfixNotation {
    static isOperator(x) {
        switch (x) {
            case '+':
            case '-':
            case '*':
            case '/':
            case '^':
            case '%':
                return true;
        }
    }
    static isOperand(x) {
        return (x >= 'a' && x <= 'z') ||
            (x >= 'A' && x <= 'Z');
    }
    static fromPrefix(str) {
        let stack = [];
        let l = str.length;
        for (let i = l - 1; i >= 0; i--) {
            let c = str[i];
            if (this.isOperator(c)) {
                let op1 = stack[stack.length - 1];
                stack.pop();
                let op2 = stack[stack.length - 1];
                stack.pop();
                let temp = "(" + op1 + c + op2 + ")";
                stack.push(temp);
            }
            else {
                stack.push(c + "");
            }
        }
        return stack[stack.length - 1];
    }
    static fromPostfix(str) {
        let s = [];
        for (let i = 0; i < str.length; i++) {
            // Push operands
            if (this.isOperand(str[i])) {
                s.push(str[i] + "");
            }
            else {
                let op1 = s.pop();
                let op2 = s.pop();
                s.pop();
                s.push("(" + op2 + str[i] +
                    op1 + ")");
            }
        }
        return s[s.length - 1];
    }
}
function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}
class idGenerator {
    static generateId() {
        let newId;
        while (true) {
            newId = Math.floor(Math.random() * 100);
            if (!this.usedIds.includes(newId)) {
                this.usedIds.push(newId);
                break;
            }
        }
        return newId;
    }
}
idGenerator.usedIds = [];
class TreeNode {
    constructor(data) {
        this.left = null;
        this.right = null;
        this.parent = null;
        this.data = data;
    }
}
class BinSearchTree {
    constructor() {
        this.rootNode = null;
    }
    insertNode(node) {
        if (this.rootNode === null) {
            this.rootNode = node;
        }
        else {
            this.insertNodeDeep(this.rootNode, node);
        }
        return node;
    }
    insertNodeDeep(root, node) {
        if (root.data > node.data) {
            if (root.left === null) {
                node.parent = root;
                root.left = node;
            }
            else {
                this.insertNodeDeep(root.left, node);
            }
        }
        else {
            if (root.right === null) {
                node.parent = root;
                root.right = node;
            }
            else {
                this.insertNodeDeep(root.right, node);
            }
        }
    }
    size(root = this.rootNode) {
        let maxLevel = 0;
        const sizeInner = (treeNode, level = 0) => {
            if (treeNode === undefined || treeNode === null) {
                return;
            }
            if (maxLevel < level) {
                maxLevel = level;
            }
            sizeInner(treeNode.left, level + 1);
            sizeInner(treeNode.right, level + 1);
        };
        sizeInner(root);
        return maxLevel;
    }
}
class RBNode extends TreeNode {
    constructor() {
        super(...arguments);
        this.red = false;
        this.left = null;
        this.right = null;
    }
}
class RedBlackTree extends BinSearchTree {
    constructor() {
        super();
        this.nil = new RBNode(0);
        this.nil.red = false;
        this.nil.left = null;
        this.nil.right = null;
        this.rootNode = this.nil;
    }
    insertNode(node) {
        const new_node = node;
        let parent = null;
        let current = null;
        new_node.parent = null;
        new_node.left = this.nil;
        new_node.right = this.nil;
        new_node.red = true;
        parent = null;
        current = this.rootNode;
        while (current !== this.nil) {
            parent = current;
            if (new_node.data < current.data) {
                current = current.left;
            }
            else {
                if (new_node.data > current.data) {
                    current = current.right;
                }
                else {
                    return;
                }
            }
        }
        new_node.parent = parent;
        if (parent === null) {
            this.rootNode = new_node;
        }
        else {
            if (new_node.data < parent.data) {
                parent.left = new_node;
            }
            else {
                parent.right = new_node;
            }
        }
        this.fix_insert(new_node);
        return node;
    }
    fix_insert(new_node) {
        let u;
        while (new_node !== this.rootNode && new_node.parent.red) {
            if (new_node.parent === new_node.parent.parent.right) {
                u = new_node.parent.parent.left;
                if (u.red) {
                    u.red = false;
                    new_node.parent.red = false;
                    new_node.parent.parent.red = true;
                    new_node = new_node.parent.parent;
                }
                else {
                    if (new_node === new_node.parent.left) {
                        new_node = new_node.parent;
                        this.rotate_right(new_node);
                    }
                    new_node.parent.red = false;
                    new_node.parent.parent.red = true;
                    this.rotate_left(new_node.parent.parent);
                }
            }
            else {
                u = new_node.parent.parent.right;
                if (u.red) {
                    u.red = false;
                    new_node.parent.red = false;
                    new_node.parent.parent.red = true;
                    new_node = new_node.parent.parent;
                }
                else {
                    if (new_node === new_node.parent.right) {
                        new_node = new_node.parent;
                        this.rotate_left(new_node);
                    }
                    new_node.parent.red = false;
                    new_node.parent.parent.red = true;
                    this.rotate_right(new_node.parent.parent);
                }
            }
        }
        this.rootNode.red = false;
    }
    rotate_left(x) {
        let y;
        y = x.right;
        x.right = y.left;
        if (y.left !== this.nil) {
            y.left.parent = x;
        }
        y.parent = x.parent;
        if (x.parent === null) {
            this.rootNode = y;
        }
        else {
            if (x === x.parent.left) {
                x.parent.left = y;
            }
            else {
                x.parent.right = y;
            }
        }
        y.left = x;
        x.parent = y;
    }
    rotate_right(x) {
        let y;
        y = x.left;
        x.left = y.right;
        if (y.right !== this.nil) {
            y.right.parent = x;
        }
        y.parent = x.parent;
        if (x.parent === null) {
            this.rootNode = y;
        }
        else {
            if (x === x.parent.right) {
                x.parent.right = y;
            }
            else {
                x.parent.left = y;
            }
        }
        y.right = x;
        x.parent = y;
    }
}
class AVLNode extends TreeNode {
    constructor(value) {
        super(value);
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}
class AVLTree extends BinSearchTree {
    insert(root, key) {
        var b;
        if (!root) {
            return new AVLNode(key);
        }
        else {
            if (key < root.data) {
                root.left = this.insert(root.left, key);
            }
            else {
                root.right = this.insert(root.right, key);
            }
        }
        root.height = 1 + Math.max(this.getHeight(root.left), this.getHeight(root.right));
        b = this.getBal(root);
        if (b > 1 && key < root.left.data) {
            return this.rRotate(root);
        }
        if (b < -1 && key > root.right.data) {
            return this.lRotate(root);
        }
        if (b > 1 && key > root.left.data) {
            root.left = this.lRotate(root.left);
            return this.rRotate(root);
        }
        if (b < -1 && key < root.right.data) {
            root.right = this.rRotate(root.right);
            return this.lRotate(root);
        }
        return root;
    }
    lRotate(z) {
        let y = z.right;
        let T2 = y.left;
        y.left = z;
        z.right = T2;
        z.height = 1 + Math.max(this.getHeight(z.left), this.getHeight(z.right));
        y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
        return y;
    }
    rRotate(z) {
        let y = z.left;
        let T3 = y.right;
        y.right = z;
        z.left = T3;
        z.height = 1 + Math.max(this.getHeight(z.left), this.getHeight(z.right));
        y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
        return y;
    }
    getHeight(root) {
        if (!root) {
            return 0;
        }
        return root.height;
    }
    getBal(root) {
        if (!root) {
            return 0;
        }
        return this.getHeight(root.left) - this.getHeight(root.right);
    }
}
class Main {
    constructor() {
        var _a;
        this.binSearchTree = new BinSearchTree();
        this.redBlackTree = new RedBlackTree();
        this.avlTree = new AVLTree();
        this.amount = 50000;
        this.isDefaultRand = false;
        (_a = document.querySelector('.calc')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            this.initTrees();
        });
    }
    initTrees() {
        var _a, _b;
        const numbers = [];
        const isDefaultCB = (_a = document.querySelector('#defaultSort')) === null || _a === void 0 ? void 0 : _a.checked;
        const amount = (_b = document.querySelector('#amount')) === null || _b === void 0 ? void 0 : _b.value;
        if (isDefaultCB !== undefined) {
            this.isDefaultRand = isDefaultCB;
        }
        if (amount !== undefined && amount !== '') {
            this.amount = Number(amount);
        }
        for (let i = 0; i < this.amount; i++) {
            numbers.push(this.isDefaultRand ? this.defaultRand() : this.exponentialRand(numbers.length));
        }
        this.binSearchTree = new BinSearchTree();
        this.redBlackTree = new RedBlackTree();
        this.avlTree = new AVLTree();
        this.initBinSearchTree(numbers);
        this.initRedBlackTree(numbers);
        this.initAVLTree(numbers);
    }
    defaultRand() {
        return Math.random();
    }
    exponentialRand(rate) {
        const U = Math.random();
        return -Math.log(U) / (rate + 1);
    }
    initBinSearchTree(numbers) {
        const startTime = new Date().getTime();
        numbers.forEach((num) => {
            const treeNode = new RBNode(num);
            this.binSearchTree.insertNode(treeNode);
        });
        const finishTime = new Date().getTime();
        if (this.isDefaultRand) {
            console.log(`Время выполнения для равномерного распределения ${this.amount} элементов =`, finishTime - startTime, 'ms');
        }
        else {
            console.log(`Время выполнения для эксп. распределения ${this.amount} элементов =`, finishTime - startTime, 'ms');
        }
        console.log(`Бинарное дерево`, this.binSearchTree);
        console.log(`Длина: `, this.binSearchTree.size());
        console.log();
    }
    initRedBlackTree(numbers) {
        const startTime = new Date().getTime();
        numbers.forEach((num) => {
            const treeNode = new RBNode(num);
            this.redBlackTree.insertNode(treeNode);
        });
        const finishTime = new Date().getTime();
        if (this.isDefaultRand) {
            console.log(`Время выполнения для равномерного распределения ${this.amount} элементов =`, finishTime - startTime, 'ms');
        }
        else {
            console.log(`Время выполнения для эксп. распределения ${this.amount} элементов =`, finishTime - startTime, 'ms');
        }
        console.log(`РБ дерево`, this.redBlackTree);
        console.log(`Длина: `, this.redBlackTree.size());
        console.log();
    }
    initAVLTree(numbers) {
        const startTime = new Date().getTime();
        let root = null;
        numbers.forEach((num) => {
            const treeNode = new AVLNode(num);
            root = this.avlTree.insert(root, num);
        });
        const finishTime = new Date().getTime();
        if (this.isDefaultRand) {
            console.log(`Время выполнения для равномерного распределения ${this.amount} элементов =`, finishTime - startTime, 'ms');
        }
        else {
            console.log(`Время выполнения для эксп. распределения ${this.amount} элементов =`, finishTime - startTime, 'ms');
        }
        console.log(`АВЛ дерево`, this.avlTree);
        console.log(`Длина: `, this.avlTree.size(root));
        console.log();
    }
}
new Main();
