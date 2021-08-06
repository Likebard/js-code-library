let isMount = true; //为true代表在mount时
let workInprogressHook = null;

const fiber = {
    stateNode: App,
    memoizedState: null,
}

function schedule() {
    workInprogressHook = fiber.memoizedState;
    fiber.stateNode();
    isMount = false;
    return App;
}


function App() {
    const [num, updateNum] = useState(0);

    return {
        //返回的jsx简化为返回对象
        onClick() {
            updateNum(num => num + 1);
        }
    }
}

window.app = schedule();